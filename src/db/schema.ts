import { appCreatedAt } from '@/utils/helpers.utils';
import {
    relations,
    type InferInsertModel,
    type InferSelectModel,
} from 'drizzle-orm';
import { int, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

const baseTableColumns = {
    id: text('id', { length: 21 }).primaryKey(),
    createdAt: int('created_at', { mode: 'timestamp_ms' })
        .$defaultFn(() => appCreatedAt())
        .notNull(),
    deletedAt: int('deleted_at', { mode: 'timestamp_ms' }),
};

export const teamTable = sqliteTable('team', {
    ...baseTableColumns,
    name: text('name').notNull(),
    conference: text('conference'),
    division: text('division'),
    city: text('city'),
    fullName: text('full_name'),
    abbreviation: text('abbreviation'),
});
export type BaseTeamTable = InferSelectModel<typeof teamTable>;
export type BaseTeamInsertTable = InferInsertModel<typeof teamTable>;
export const teamTableRelations = relations(teamTable, ({ many }) => ({
    games: many(gameTable),
}));

export const playerTable = sqliteTable('player', {
    ...baseTableColumns,
    name: text('name').notNull(),
    position: text('position'),
    height: text('height'),
    weight: integer('weight'),
    teamId: text('team_id').references(() => teamTable.id),
});
export type BasePlayerTable = InferSelectModel<typeof playerTable>;
export type BasePlayerInsertTable = InferInsertModel<typeof playerTable>;
export const playerTableRelations = relations(playerTable, ({ many }) => ({
    playerGameStatsTable: many(playerGameStatsTable),
}));

export const gameTable = sqliteTable('game', {
    ...baseTableColumns,
    date: int('date', { mode: 'timestamp_ms' }).notNull(),
    season: text('season').notNull(),
    homeTeamId: text('home_team_id')
        .references(() => teamTable.id)
        .notNull(),
    visitorTeamId: text('visitor_team_id')
        .references(() => teamTable.id)
        .notNull(),
    homeTeamScore: integer('home_team_score'),
    visitorTeamScore: integer('visitor_team_score'),
});
export type BaseGameTable = InferSelectModel<typeof gameTable>;
export type BaseGameInsertTable = InferInsertModel<typeof gameTable>;

export const playerGameStatsTable = sqliteTable('player_game_stats', {
    ...baseTableColumns,
    minutesPlayed: integer('minutes_played'),
    fgMade: integer('fg_made'),
    fgAttempts: integer('fg_attempts'),
    fgThreeMade: integer('fg_three_made'),
    fgThreeAtt: integer('fg_three_att'),
    ftMade: integer('ft_made'),
    ftAtt: integer('ft_att'),
    offensiveRebounds: integer('offensive_rebounds'),
    defensiveRebounds: integer('defensive_rebounds'),
    blocks: integer('blocks'),
    assists: integer('assists'),
    steals: integer('steals'),
    turnovers: integer('turnovers'),
    points: integer('points'),
    gameId: text('game_id')
        .references(() => gameTable.id)
        .notNull(),
    playerId: text('player_id')
        .references(() => playerTable.id)
        .notNull(),
});
export type BasePlayerGameStatsTable = InferSelectModel<
    typeof playerGameStatsTable
>;
export type BasePlayerGameStatsInsertTable = InferInsertModel<
    typeof playerGameStatsTable
>;
export const playerGameStatsTableRelations = relations(
    playerGameStatsTable,
    ({ one }) => ({
        game: one(gameTable, {
            fields: [playerGameStatsTable.gameId],
            references: [gameTable.id],
        }),
        player: one(playerTable, {
            fields: [playerGameStatsTable.playerId],
            references: [playerTable.id],
        }),
    }),
);

export const userFavoritePlayerTable = sqliteTable('user_favorite_player', {
    ...baseTableColumns,
    userId: text('user_id').notNull(),
    playerId: text('player_id')
        .references(() => playerTable.id)
        .notNull(),
});
export type BaseUserFavoritePlayerTable = InferSelectModel<
    typeof userFavoritePlayerTable
>;
export type BaseUserFavoritePlayerInsertTable = InferInsertModel<
    typeof userFavoritePlayerTable
>;

export const userFavoriteTeamTable = sqliteTable('user_favorite_team', {
    ...baseTableColumns,
    userId: text('user_id').notNull(),
    teamId: text('team_id')
        .references(() => teamTable.id)
        .notNull(),
});
export type BaseUserFavoriteTeamTable = InferSelectModel<
    typeof userFavoriteTeamTable
>;
export type BaseUserFavoriteTeamInsertTable = InferInsertModel<
    typeof userFavoriteTeamTable
>;
