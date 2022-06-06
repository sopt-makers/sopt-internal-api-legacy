CREATE TABLE projects (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name text NOT NULL,
  generation int,
  category text NOT NULL,
  service_type text[] NOT NULL,
  start_at timestamp NOT NULL,
  end_at timestamp,
  is_available boolean,
  -- 창업중
  is_founding boolean,
  summary text NOT NULL,
  detail text NOT NULL,
  thumbnail_image text NOT NULL,
  images text[]
)

CREATE TABLE links (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,	
  -- enum?
	title text NOT NULL,
	url text NOT NULL,
	project_id int NOT NULL,
	
  foreign key(project_id) references(projects.id),
)

CREATE TABLE project_users (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  project_id int,
  user_id int,
  role text,
  description text,
	-- 초기 멤버인지, 추가된 멤버인지 구분
	is_team_member boolean,

  foreign key(project_id) references(projects.id),
  foreign key(user_id) references(users.id),
)

CREATE TABLE users (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  auth_user_id int NOT NULL,
  -- 여기에 유저 메타 정보도 들어가야 하지 않을까?
	name text NOT NULL,
)