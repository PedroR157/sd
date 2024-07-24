import { z } from 'zod';

export const MovesSchema = z.object({
  move_id: z.number().optional(),
  move_name: z.string(),
  url: z.string()
});

export const MoveLearnMethodSchema = z.object({
  mlm_name: z.string(),
  url: z.string()
});

export const VersionGroupsSchema = z.object({
  vg_name: z.string(),
  url: z.string()
});

export const MoveInfoInsertSchema = z.object({
  move: MovesSchema,
  move_learn_method: MoveLearnMethodSchema,
  version_group: VersionGroupsSchema,
  level_learned_at: z.number()
});

export type MoveInsert = z.infer<typeof MoveInfoInsertSchema>;

export const PokeMoveSchema = MoveInfoInsertSchema.extend({
  move_id: z.number(),
});

export type Move = z.infer<typeof PokeMoveSchema>;
