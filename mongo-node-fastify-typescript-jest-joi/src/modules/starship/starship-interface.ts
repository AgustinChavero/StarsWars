export interface NewStarship {
  name: string;
  manufacturer?: string;
  cost_in_credits?: string;
  length?: string;
  max_atmosphering_speed?: string;
  crew?: string;
  passengers?: string;
  cargo_capacity?: string;
  consumables?: string;
  hyperdrive_rating?: number;
  MGLT?: number;
  starship_class?: string;
  pilots?: string[];
  films?: string[];
  is_deleted?: boolean;
}
