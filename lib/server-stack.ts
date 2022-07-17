import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as rds from "aws-cdk-lib/aws-rds";

export class ServerStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 👇 create the VPC
    const vpc = new ec2.Vpc(this, "sopt-core-vpc", {
      cidr: "10.0.0.0/16",
      natGateways: 0,
      maxAzs: 3,
      subnetConfiguration: [
        {
          name: "public-subnet-1",
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },
        {
          name: "isolated-subnet-1",
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          cidrMask: 28,
        },
      ],
    });

    // 👇 create a security group for the EC2 instance
    const ec2InstanceSG = new ec2.SecurityGroup(this, "api-server-ec2-instance-sg", {
      vpc,
    });

    ec2InstanceSG.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), "allow SSH connections from anywhere");
    ec2InstanceSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(4000),
      "allow TCP connection on PORT 4000 from anywhere",
    );
    ec2InstanceSG.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(5000),
      "allow TCP connection on PORT 4000 from anywhere(auth)",
    );

    // 👇 create the EC2 instance
    const ec2Instance = new ec2.Instance(this, "api-server-ec2-instance", {
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      securityGroup: ec2InstanceSG,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE3, ec2.InstanceSize.MICRO),
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      keyName: "sopt-core-key-pair",
    });

    // elastic IP
    const eip = new ec2.CfnEIP(this, "server-ip");
    // EC2 Instance <> EIP
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const eipAssociation = new ec2.CfnEIPAssociation(this, "Ec2Association", {
      eip: eip.ref,
      instanceId: ec2Instance.instanceId,
    });

    // 👇 create RDS instance
    const dbInstance = new rds.DatabaseInstance(this, "sopt-core-db-instance", {
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      },
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_14_2,
      }),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE3, ec2.InstanceSize.MICRO),
      credentials: rds.Credentials.fromGeneratedSecret("postgres"),
      multiAz: false,
      allocatedStorage: 100,
      maxAllocatedStorage: 105,
      allowMajorVersionUpgrade: false,
      autoMinorVersionUpgrade: true,
      backupRetention: cdk.Duration.days(0),
      deleteAutomatedBackups: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      deletionProtection: false,
      databaseName: "soptCoreDB",
      publiclyAccessible: false,
    });

    dbInstance.connections.allowFrom(ec2Instance, ec2.Port.tcp(5432));

    new cdk.CfnOutput(this, "dbEndpoint", {
      value: dbInstance.instanceEndpoint.hostname,
    });

    new cdk.CfnOutput(this, "secretName", {
      value: dbInstance.secret?.secretName as string,
    });
  }
}
