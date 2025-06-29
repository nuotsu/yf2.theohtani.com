declare global {
	namespace Yahoo {
		interface UserInfo {
			sub: string
			name: string
			given_name: string
			family_name: string
			nickname: string
			locale: string
			profile_images: {
				image32: string
				image64: string
				image128: string
				image192: string
			}
			picture: string
		}
	}

	namespace Fantasy {
		interface ResponseError {
			error: string
		}

		interface Response<T = any> {
			fantasy_content: {
				'xml:lang': string
				'yahoo:uri': string
				time: string
				copyright: string
				refresh_rate: string // number
			} & T
		}

		interface Plural<T> {
			[key: string /* number */]: T
			count: number
		}

		// responses

		type UserLeaguesResponse = Response<{
			users: Plural<{
				user: [
					{ guid: string },
					{
						games: Plural<{ game: Game }>
					},
				]
			}>
		}>

		type LeagueResponse = Response<{
			league: [LeagueInfo, { teams: Plural<{ team: Team }> } | undefined]
		}>

		type LeagueTeamsResponse<Params = []> = Response<{
			league: [LeagueInfo, { teams: Plural<{ team: Team<Params> }> }]
		}>

		type TeamResponse = Response<{
			team: [TeamInfo]
		}>

		type LeagueStandingsResponse<Params = []> = Response<{
			league: [
				LeagueInfo,
				{ standings: [{ teams: Plural<{ team: Team<Params> }> }] },
			]
		}>

		type LeagueScoreboardResponse = Response<{
			league: [LeagueInfo, LeagueScoreboard]
		}>

		type LeagueSettingsResponse = Response<{
			league: [LeagueInfo, LeagueSettings]
		}>

		type StatCategoriesResponse = Response<{
			game: [
				GameInfo,
				{
					stat_categories: {
						stats: Array<{
							stat: {
								stat_id: number
								name: string
								display_name: string
								sort_order: string // number
								position_types: Array<{ position_type: string }>
							}
						}>
					}
				},
			]
		}>

		type PlayerResponse = Response<{
			player: [PlayerInfo]
		}>

		type RosterResponse = Response<{
			team: [TeamInfo, Roster]
		}>

		type TransactionsResponse = Response<{
			league: [
				LeagueInfo,
				{
					transactions: Plural<{
						transaction: Transaction
					}>
				},
			]
		}>

		// objects

		type Game = [GameInfo, { leagues: Plural<League> }]

		interface GameInfo {
			game_key: string
			game_id: string
			name: string
			code: string
			type: string
			url: string
			season: string
			is_registration_over: 0 | 1
			is_game_over: 0 | 1
			is_offseason: 0 | 1
			is_live_draft_lobby_active: 0 | 1
			alternate_start_deadline: string // YYYY-MM-DD
		}

		interface League {
			league: [LeagueInfo]
		}

		interface LeagueInfo {
			league_key: string
			league_id: string
			name: string
			url: string
			logo_url: string
			draft_status: string
			num_teams: number
			edit_key: string // YYYY-MM-DD
			weekly_deadline: string
			league_update_timestamp: string
			scoring_type: string
			league_type: string
			renew: string
			renewed: string
			felo_tier: string
			iris_group_chat_id: string
			allow_add_to_dl_extra_pos: number
			is_pro_league: string // number
			is_cash_league: string // number
			current_week: number
			start_week: string // number
			start_date: string // YYYY-MM-DD
			end_week: string // number
			end_date: string // YYYY-MM-DD
			is_plus_league: string // number
			game_code: string
			season: string // number
		}

		type Team<Params = []> = [TeamInfo, ...Params]

		type TeamInfo = [
			{ team_key: string },
			{ team_id: string /* number */ },
			{ name: string },
			{ is_owned_by_current_login: 0 | 1 } | [],
			{ url: string },
			{
				team_logos: Array<{
					team_logo: {
						size: string
						url: string
					}
				}>
			},
			{ waiver_priority: number },
			{ number_of_moves: number },
			{ number_of_trades: number },
			{
				roster_adds: {
					coverage_type: string
					coverage_value: number
					value: string // number
				}
			},
			{ league_scoring_type: string },
			{ draft_position: number },
			{ has_draft_grade: number } | [],
			{
				managers: Array<Manager>
			},
		]

		interface Manager {
			manager: {
				manager_id: string
				nickname: string
				guid: string
				image_url: string
				felo_score: string // number
				felo_tier: string
			}
		}

		interface TeamStats {
			team_stats: {
				coverage_type: string
				season: string
				stats: Array<{
					stat: {
						stat_id: string // number
						value: string // number
					}
				}>
			}
			team_points: {
				coverage_type: string
				season: string
				total: string // number
			}
		}

		interface TeamStandings {
			team_standings: {
				rank: string // number
				playoff_seed: string // number
				outcome_totals: {
					wins: string // number
					losses: string // number
					ties: string // number
					percentage: string // number
				}
				games_back: string // number || '-'
			}
		}

		interface LeagueScoreboard {
			scoreboard: {
				[key: string /* number */]: {
					matchups: Plural<{ matchup: Matchup }>
				}
				week: number
			}
		}

		interface LeagueSettings {
			settings: [
				{
					draft_type: string
					is_auction_draft: string // number
					scoring_type: string
					uses_playoff: string // number
					has_playoff_consolation_games: boolean
					playoff_start_week: string // number
					uses_playoff_reseeding: 0 | 1
					uses_lock_eliminated_teams: 0 | 1
					num_playoff_teams: string // number
					num_playoff_consolation_teams: number
					has_multiweek_championship: number
					waiver_type: string
					waiver_rule: string
					uses_faab: string // number
					draft_time: string // number
					draft_pick_time: string // number
					post_draft_players: string
					max_teams: string // number
					waiver_time: string // number
					trade_end_date: string // YYYY-MM-DD
					trade_ratify_type: string
					trade_reject_time: string // number
					player_pool: string
					cant_cut_list: string
					draft_together: 0 | 1
					can_trade_draft_picks: string // number
					sendbird_channel_url: string
					roster_positions: Array<{
						roster_position: {
							position: string
							count: string // number
							is_starting_position: 0 | 1
						}
					}>
					stat_categories: StatCategories
					max_weekly_adds: string // number
					uses_median_score: boolean
					league_premium_features: []
				},
				{
					season_type: string
					min_innings_pitched: string // number
					week_has_enough_qualifying_days: Record<`${number}`, 0 | 1>
				},
			]
		}

		interface Matchup {
			'0': { teams: Plural<{ team: Team<[Fantasy.TeamStats]> }> }
			week: string // number
			week_start: string // YYYY-MM-DD
			week_end: string // YYYY-MM-DD
			status: string
			is_playoffs: string // number
			is_consolation: string // number
			stat_winners: Array<StatWinner>
		}

		interface StatWinner {
			stat_winner: {
				stat_id: string // number
				winner_team_key?: string
				is_tied?: 0 | 1
			}
		}

		interface Stat {
			stat: {
				stat_id: number
				enabled?: string // number
				name: string
				display_name: string
				group?: string
				abbr?: string
				sort_order: string // number
				position_type?: string
				position_types?: Array<{ position_type: string }>
				stat_position_types?: [
					{
						stat_position_type: {
							position_type: string
						}
					},
				]
			}
		}

		interface StatCategories {
			stats: Array<Stat>
			groups: Array<{
				group: {
					group_name: string
					group_display_name: string
					group_abbr: string
				}
			}>
		}

		type PlayerInfo = [
			{ player_key: string },
			{ player_id: string /* number */ },
			{
				name: {
					full: string
					first: string
					last: string
					ascii_first: string
					ascii_last: string
				}
			},
			{ url: string },
			{ status: string; status_full: string } | [],
			{ injury_note: string } | [],
			{ on_disabled_list: 0 | 1 } | [],
			{ editorial_player_key: string },
			{ editorial_team_key: string },
			{ editorial_team_full_name: string },
			{ editorial_team_abbr: string },
			{ editorial_team_url: string },
			{
				is_keeper: {
					status: boolean
					cost: boolean
					kept: boolean
				}
			},
			{ uniform_number: string /* number */ },
			{ display_position: string },
			{
				headshot: {
					url: string
					size: string
				}
				image_url: string
			},
			{ is_undroppable: '0' | '1' },
			{ position_type: string },
			{ primary_position: string },
			{ eligible_positions: Array<{ position: string }> },
			{ eligible_positions_to_add: [] },
			{ has_player_notes: 0 | 1 },
			{ player_notes_last_timestamp: number },
		]

		interface Roster {
			roster: {
				'0': {
					players: Plural<RosterPlayer>
				}
				coverage_type: 'date'
				date: string // date
				is_prescoring: 0 | 1
				is_editable: 0 | 1
				outs_pitched: {
					coverage_type: string // 'week'
					coverage_value: number
					value: string // number
				}
			}
		}

		interface RosterPlayer {
			player:
				| [PlayerInfo, RosterPlayerData]
				| [PlayerInfo, RosterPlayerData, RosterPlayerIsEditable]
				| [
						PlayerInfo,
						RosterPlayerData,
						RosterPlayerStarting,
						RosterPlayerIsEditable,
				  ] // if is_owned_by_current_login
		}

		type RosterPlayerIsEditable = { is_editable: 0 | 1 }

		interface RosterPlayerData {
			selected_position: [
				{
					coverage_type: string // 'date'
					date: string // date
				},
				{ position: string },
				{ is_flex: 0 | 1 },
			]
		}

		interface RosterPlayerStarting {
			starting_status: [
				{
					coverage_type: string // 'date'
					date: string // date
				},
				{ is_starting: 0 | 1 },
			]
			batting_order?: [{ order_num: string /* number */ }]
		}

		interface TransactionInfo {
			transaction_key: string
			transaction_id: string // number
			type: 'add/drop' | 'add' | 'drop'
			status: 'successful'
			timestamp: string
		}

		interface TransactionPlayers {
			players: Plural<{
				player: [TransactionPlayerInfo, TransactionData]
			}>
		}

		interface TransactionData {
			transaction_data:
				| TransactionAddData
				| TransactionDropData
				| Array<TransactionAddData | TransactionDropData>
		}

		interface TransactionAddData {
			type: 'add'
			source_type: 'teams' | 'freeagents'
			destination_type: 'team' | 'waivers'
			destination_team_key: string
			destination_team_name: string
		}

		interface TransactionDropData {
			type: 'drop'
			source_type: 'teams' | 'freeagents'
			source_team_key: string
			source_team_name: string
			destination_type: 'team' | 'waivers'
		}

		type Transaction = [TransactionInfo, TransactionPlayers]

		type TransactionPlayerInfo = [
			{ player_key: string },
			{ player_id: string /* number */ },
			{
				name: {
					full: string
					first: string
					last: string
					ascii_first: string
					ascii_last: string
				}
			},
			{ editorial_team_abbr: string },
			{ display_position: string },
			{ position_type: 'B' | 'P' },
		]
	}
}

export {}
