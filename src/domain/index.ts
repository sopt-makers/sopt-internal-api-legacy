import { LinkRepository } from "@/domain/linkRepository";
import { ProjectRepository } from "@/domain/projectRepository";
import { UserRepository } from "@/domain/userRepository";

export interface Repository {
  user: UserRepository;
  project: ProjectRepository;
  link: LinkRepository;
}
