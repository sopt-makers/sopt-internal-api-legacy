import type { Repository } from "@/domain";

export interface Services {
  hello(): string;
}

interface CreateServicesDeps {
  repository: Repository;
}

export function createServices({ repository }: CreateServicesDeps): Services {
  repository;

  return {
    hello() {
      return "world";
    },
  };
}
