import { z } from 'zod';

export const MoveSchema = z.object({
  move_id: z.number().optional(),
  name: z.string()
});

export const MoveInfoInsertSchema = z.object({
  id: z.string(),
  level_learned_at: z.string(),
  move_learn_method: z.string(),
  version_group: z.number(),
  move: MoveSchema,
});

export type MoveInsert = z.infer<typeof MoveInfoInsertSchema>;

export const PokeMoveSchema = MoveInfoInsertSchema.extend({
  move_id: z.number(),
});

export type PokemonMove = z.infer<typeof PokeMoveSchema>;