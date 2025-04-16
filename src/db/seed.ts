import { db } from './index';
import {
    teamTable,
    playerTable,
    gameTable,
    playerGameStatsTable,
} from './schema';
import { nanoid } from 'nanoid';
import { faker } from '@faker-js/faker';

const nbaTeams = [
    // Eastern Conference
    // Atlantic Division
    {
        name: 'Boston Celtics',
        conference: 'Eastern',
        division: 'Atlantic',
        city: 'Boston',
        fullName: 'Boston Celtics',
        abbreviation: 'BOS',
    },
    {
        name: 'Brooklyn Nets',
        conference: 'Eastern',
        division: 'Atlantic',
        city: 'Brooklyn',
        fullName: 'Brooklyn Nets',
        abbreviation: 'BKN',
    },
    {
        name: 'New York Knicks',
        conference: 'Eastern',
        division: 'Atlantic',
        city: 'New York',
        fullName: 'New York Knicks',
        abbreviation: 'NYK',
    },
    {
        name: 'Philadelphia 76ers',
        conference: 'Eastern',
        division: 'Atlantic',
        city: 'Philadelphia',
        fullName: 'Philadelphia 76ers',
        abbreviation: 'PHI',
    },
    {
        name: 'Toronto Raptors',
        conference: 'Eastern',
        division: 'Atlantic',
        city: 'Toronto',
        fullName: 'Toronto Raptors',
        abbreviation: 'TOR',
    },

    // Central Division
    {
        name: 'Chicago Bulls',
        conference: 'Eastern',
        division: 'Central',
        city: 'Chicago',
        fullName: 'Chicago Bulls',
        abbreviation: 'CHI',
    },
    {
        name: 'Cleveland Cavaliers',
        conference: 'Eastern',
        division: 'Central',
        city: 'Cleveland',
        fullName: 'Cleveland Cavaliers',
        abbreviation: 'CLE',
    },
    {
        name: 'Detroit Pistons',
        conference: 'Eastern',
        division: 'Central',
        city: 'Detroit',
        fullName: 'Detroit Pistons',
        abbreviation: 'DET',
    },
    {
        name: 'Indiana Pacers',
        conference: 'Eastern',
        division: 'Central',
        city: 'Indianapolis',
        fullName: 'Indiana Pacers',
        abbreviation: 'IND',
    },
    {
        name: 'Milwaukee Bucks',
        conference: 'Eastern',
        division: 'Central',
        city: 'Milwaukee',
        fullName: 'Milwaukee Bucks',
        abbreviation: 'MIL',
    },

    // Southeast Division
    {
        name: 'Atlanta Hawks',
        conference: 'Eastern',
        division: 'Southeast',
        city: 'Atlanta',
        fullName: 'Atlanta Hawks',
        abbreviation: 'ATL',
    },
    {
        name: 'Charlotte Hornets',
        conference: 'Eastern',
        division: 'Southeast',
        city: 'Charlotte',
        fullName: 'Charlotte Hornets',
        abbreviation: 'CHA',
    },
    {
        name: 'Miami Heat',
        conference: 'Eastern',
        division: 'Southeast',
        city: 'Miami',
        fullName: 'Miami Heat',
        abbreviation: 'MIA',
    },
    {
        name: 'Orlando Magic',
        conference: 'Eastern',
        division: 'Southeast',
        city: 'Orlando',
        fullName: 'Orlando Magic',
        abbreviation: 'ORL',
    },
    {
        name: 'Washington Wizards',
        conference: 'Eastern',
        division: 'Southeast',
        city: 'Washington',
        fullName: 'Washington Wizards',
        abbreviation: 'WAS',
    },

    // Western Conference
    // Northwest Division
    {
        name: 'Denver Nuggets',
        conference: 'Western',
        division: 'Northwest',
        city: 'Denver',
        fullName: 'Denver Nuggets',
        abbreviation: 'DEN',
    },
    {
        name: 'Minnesota Timberwolves',
        conference: 'Western',
        division: 'Northwest',
        city: 'Minneapolis',
        fullName: 'Minnesota Timberwolves',
        abbreviation: 'MIN',
    },
    {
        name: 'Oklahoma City Thunder',
        conference: 'Western',
        division: 'Northwest',
        city: 'Oklahoma City',
        fullName: 'Oklahoma City Thunder',
        abbreviation: 'OKC',
    },
    {
        name: 'Portland Trail Blazers',
        conference: 'Western',
        division: 'Northwest',
        city: 'Portland',
        fullName: 'Portland Trail Blazers',
        abbreviation: 'POR',
    },
    {
        name: 'Utah Jazz',
        conference: 'Western',
        division: 'Northwest',
        city: 'Salt Lake City',
        fullName: 'Utah Jazz',
        abbreviation: 'UTA',
    },

    // Pacific Division
    {
        name: 'Golden State Warriors',
        conference: 'Western',
        division: 'Pacific',
        city: 'San Francisco',
        fullName: 'Golden State Warriors',
        abbreviation: 'GSW',
    },
    {
        name: 'LA Clippers',
        conference: 'Western',
        division: 'Pacific',
        city: 'Los Angeles',
        fullName: 'Los Angeles Clippers',
        abbreviation: 'LAC',
    },
    {
        name: 'Los Angeles Lakers',
        conference: 'Western',
        division: 'Pacific',
        city: 'Los Angeles',
        fullName: 'Los Angeles Lakers',
        abbreviation: 'LAL',
    },
    {
        name: 'Phoenix Suns',
        conference: 'Western',
        division: 'Pacific',
        city: 'Phoenix',
        fullName: 'Phoenix Suns',
        abbreviation: 'PHX',
    },
    {
        name: 'Sacramento Kings',
        conference: 'Western',
        division: 'Pacific',
        city: 'Sacramento',
        fullName: 'Sacramento Kings',
        abbreviation: 'SAC',
    },

    // Southwest Division
    {
        name: 'Dallas Mavericks',
        conference: 'Western',
        division: 'Southwest',
        city: 'Dallas',
        fullName: 'Dallas Mavericks',
        abbreviation: 'DAL',
    },
    {
        name: 'Houston Rockets',
        conference: 'Western',
        division: 'Southwest',
        city: 'Houston',
        fullName: 'Houston Rockets',
        abbreviation: 'HOU',
    },
    {
        name: 'Memphis Grizzlies',
        conference: 'Western',
        division: 'Southwest',
        city: 'Memphis',
        fullName: 'Memphis Grizzlies',
        abbreviation: 'MEM',
    },
    {
        name: 'New Orleans Pelicans',
        conference: 'Western',
        division: 'Southwest',
        city: 'New Orleans',
        fullName: 'New Orleans Pelicans',
        abbreviation: 'NOP',
    },
    {
        name: 'San Antonio Spurs',
        conference: 'Western',
        division: 'Southwest',
        city: 'San Antonio',
        fullName: 'San Antonio Spurs',
        abbreviation: 'SAS',
    },
];

// Map of team abbreviations to their IDs (will be populated after teams are inserted)
const teamIdMap = new Map<string, string>();

// Current NBA players (2023-2024 season)
const nbaPlayers = [
    // Charlotte Hornets
    {
        name: 'Miles Bridges',
        position: 'F',
        height: '6-7',
        weight: 225,
        teamAbbreviation: 'CHA',
    },
    {
        name: 'LaMelo Ball',
        position: 'G',
        height: '6-7',
        weight: 180,
        teamAbbreviation: 'CHA',
    },
    {
        name: 'Grant Williams',
        position: 'F',
        height: '6-6',
        weight: 236,
        teamAbbreviation: 'CHA',
    },
    {
        name: 'DaQuan Jeffries',
        position: 'G-F',
        height: '6-5',
        weight: 222,
        teamAbbreviation: 'CHA',
    },
    {
        name: 'Mark Williams',
        position: 'C',
        height: '7-0',
        weight: 240,
        teamAbbreviation: 'CHA',
    },
    {
        name: 'Damion Baugh',
        position: 'G',
        height: '6-4',
        weight: 194,
        teamAbbreviation: 'CHA',
    },
    {
        name: 'Nick Smith Jr.',
        position: 'G',
        height: '6-2',
        weight: 185,
        teamAbbreviation: 'CHA',
    },
    {
        name: 'Wendell Moore Jr.',
        position: 'G',
        height: '6-5',
        weight: 215,
        teamAbbreviation: 'CHA',
    },
    {
        name: 'Josh Green',
        position: 'G',
        height: '6-5',
        weight: 200,
        teamAbbreviation: 'CHA',
    },
    {
        name: 'Jusuf Nurkić',
        position: 'C',
        height: '7-0',
        weight: 290,
        teamAbbreviation: 'CHA',
    },
    {
        name: 'Josh Okogie',
        position: 'G',
        height: '6-4',
        weight: 213,
        teamAbbreviation: 'CHA',
    },
    {
        name: 'Moussa Diabaté',
        position: 'F',
        height: '6-9',
        weight: 210,
        teamAbbreviation: 'CHA',
    },
    {
        name: 'Tre Mann',
        position: 'G',
        height: '6-3',
        weight: 178,
        teamAbbreviation: 'CHA',
    },
    {
        name: 'Brandon Miller',
        position: 'F',
        height: '6-7',
        weight: 200,
        teamAbbreviation: 'CHA',
    },
    {
        name: 'KJ Simpson',
        position: 'G',
        height: '6-0',
        weight: 189,
        teamAbbreviation: 'CHA',
    },
    {
        name: 'Seth Curry',
        position: 'G',
        height: '6-1',
        weight: 185,
        teamAbbreviation: 'CHA',
    },
    {
        name: 'Tidjane Salaün',
        position: 'F',
        height: '6-8',
        weight: 207,
        teamAbbreviation: 'CHA',
    },
    {
        name: 'Taj Gibson',
        position: 'F',
        height: '6-9',
        weight: 232,
        teamAbbreviation: 'CHA',
    },

    // Boston Celtics
    {
        name: 'Jayson Tatum',
        position: 'F',
        height: '6-8',
        weight: 210,
        teamAbbreviation: 'BOS',
    },
    {
        name: 'Jaylen Brown',
        position: 'G/F',
        height: '6-6',
        weight: 223,
        teamAbbreviation: 'BOS',
    },
    {
        name: 'Kristaps Porzingis',
        position: 'F/C',
        height: '7-3',
        weight: 240,
        teamAbbreviation: 'BOS',
    },
    {
        name: 'Derrick White',
        position: 'G',
        height: '6-4',
        weight: 190,
        teamAbbreviation: 'BOS',
    },
    {
        name: 'Jrue Holiday',
        position: 'G',
        height: '6-4',
        weight: 205,
        teamAbbreviation: 'BOS',
    },

    // Milwaukee Bucks
    {
        name: 'Giannis Antetokounmpo',
        position: 'F',
        height: '6-11',
        weight: 242,
        teamAbbreviation: 'MIL',
    },
    {
        name: 'Damian Lillard',
        position: 'G',
        height: '6-2',
        weight: 195,
        teamAbbreviation: 'MIL',
    },
    {
        name: 'Khris Middleton',
        position: 'F',
        height: '6-7',
        weight: 222,
        teamAbbreviation: 'MIL',
    },
    {
        name: 'Brook Lopez',
        position: 'C',
        height: '7-0',
        weight: 282,
        teamAbbreviation: 'MIL',
    },
    {
        name: 'Bobby Portis',
        position: 'F/C',
        height: '6-10',
        weight: 250,
        teamAbbreviation: 'MIL',
    },

    // Denver Nuggets
    {
        name: 'Nikola Jokic',
        position: 'C',
        height: '6-11',
        weight: 284,
        teamAbbreviation: 'DEN',
    },
    {
        name: 'Jamal Murray',
        position: 'G',
        height: '6-4',
        weight: 215,
        teamAbbreviation: 'DEN',
    },
    {
        name: 'Michael Porter Jr.',
        position: 'F',
        height: '6-10',
        weight: 218,
        teamAbbreviation: 'DEN',
    },
    {
        name: 'Aaron Gordon',
        position: 'F',
        height: '6-8',
        weight: 235,
        teamAbbreviation: 'DEN',
    },
    {
        name: 'Kentavious Caldwell-Pope',
        position: 'G',
        height: '6-5',
        weight: 204,
        teamAbbreviation: 'DEN',
    },

    // Phoenix Suns
    {
        name: 'Kevin Durant',
        position: 'F',
        height: '6-10',
        weight: 240,
        teamAbbreviation: 'PHX',
    },
    {
        name: 'Devin Booker',
        position: 'G',
        height: '6-5',
        weight: 206,
        teamAbbreviation: 'PHX',
    },
    {
        name: 'Bradley Beal',
        position: 'G',
        height: '6-4',
        weight: 207,
        teamAbbreviation: 'PHX',
    },
    {
        name: 'Jusuf Nurkic',
        position: 'C',
        height: '6-11',
        weight: 290,
        teamAbbreviation: 'PHX',
    },
    {
        name: 'Grayson Allen',
        position: 'G',
        height: '6-4',
        weight: 198,
        teamAbbreviation: 'PHX',
    },

    // Los Angeles Lakers
    {
        name: 'LeBron James',
        position: 'F',
        height: '6-9',
        weight: 250,
        teamAbbreviation: 'LAL',
    },
    {
        name: 'Anthony Davis',
        position: 'F/C',
        height: '6-10',
        weight: 253,
        teamAbbreviation: 'LAL',
    },
    {
        name: "D'Angelo Russell",
        position: 'G',
        height: '6-4',
        weight: 193,
        teamAbbreviation: 'LAL',
    },
    {
        name: 'Austin Reaves',
        position: 'G',
        height: '6-5',
        weight: 197,
        teamAbbreviation: 'LAL',
    },
    {
        name: 'Rui Hachimura',
        position: 'F',
        height: '6-8',
        weight: 230,
        teamAbbreviation: 'LAL',
    },

    // Golden State Warriors
    {
        name: 'Stephen Curry',
        position: 'G',
        height: '6-2',
        weight: 185,
        teamAbbreviation: 'GSW',
    },
    {
        name: 'Klay Thompson',
        position: 'G',
        height: '6-6',
        weight: 220,
        teamAbbreviation: 'GSW',
    },
    {
        name: 'Draymond Green',
        position: 'F',
        height: '6-6',
        weight: 230,
        teamAbbreviation: 'GSW',
    },
    {
        name: 'Andrew Wiggins',
        position: 'F',
        height: '6-7',
        weight: 197,
        teamAbbreviation: 'GSW',
    },
    {
        name: 'Kevon Looney',
        position: 'C',
        height: '6-9',
        weight: 222,
        teamAbbreviation: 'GSW',
    },

    // Philadelphia 76ers
    {
        name: 'Joel Embiid',
        position: 'C',
        height: '7-0',
        weight: 280,
        teamAbbreviation: 'PHI',
    },
    {
        name: 'Tyrese Maxey',
        position: 'G',
        height: '6-2',
        weight: 200,
        teamAbbreviation: 'PHI',
    },
    {
        name: 'Tobias Harris',
        position: 'F',
        height: '6-8',
        weight: 226,
        teamAbbreviation: 'PHI',
    },
    {
        name: "De'Anthony Melton",
        position: 'G',
        height: '6-2',
        weight: 200,
        teamAbbreviation: 'PHI',
    },
    {
        name: 'Kelly Oubre Jr.',
        position: 'F',
        height: '6-7',
        weight: 203,
        teamAbbreviation: 'PHI',
    },

    // Miami Heat
    {
        name: 'Jimmy Butler',
        position: 'F',
        height: '6-7',
        weight: 230,
        teamAbbreviation: 'MIA',
    },
    {
        name: 'Bam Adebayo',
        position: 'C',
        height: '6-9',
        weight: 255,
        teamAbbreviation: 'MIA',
    },
    {
        name: 'Tyler Herro',
        position: 'G',
        height: '6-5',
        weight: 195,
        teamAbbreviation: 'MIA',
    },
    {
        name: 'Duncan Robinson',
        position: 'F',
        height: '6-7',
        weight: 215,
        teamAbbreviation: 'MIA',
    },
    {
        name: 'Kyle Lowry',
        position: 'G',
        height: '6-0',
        weight: 196,
        teamAbbreviation: 'MIA',
    },

    // Dallas Mavericks
    {
        name: 'Luka Doncic',
        position: 'G',
        height: '6-7',
        weight: 230,
        teamAbbreviation: 'DAL',
    },
    {
        name: 'Kyrie Irving',
        position: 'G',
        height: '6-2',
        weight: 195,
        teamAbbreviation: 'DAL',
    },
    {
        name: 'Tim Hardaway Jr.',
        position: 'G/F',
        height: '6-5',
        weight: 205,
        teamAbbreviation: 'DAL',
    },
    {
        name: 'Grant Williams',
        position: 'F',
        height: '6-6',
        weight: 236,
        teamAbbreviation: 'DAL',
    },
    {
        name: 'Dereck Lively II',
        position: 'C',
        height: '7-1',
        weight: 230,
        teamAbbreviation: 'DAL',
    },

    // Oklahoma City Thunder
    {
        name: 'Shai Gilgeous-Alexander',
        position: 'G',
        height: '6-6',
        weight: 195,
        teamAbbreviation: 'OKC',
    },
    {
        name: 'Chet Holmgren',
        position: 'C',
        height: '7-1',
        weight: 195,
        teamAbbreviation: 'OKC',
    },
    {
        name: 'Jalen Williams',
        position: 'G/F',
        height: '6-6',
        weight: 195,
        teamAbbreviation: 'OKC',
    },
    {
        name: 'Josh Giddey',
        position: 'G',
        height: '6-8',
        weight: 216,
        teamAbbreviation: 'OKC',
    },
    {
        name: 'Luguentz Dort',
        position: 'G/F',
        height: '6-4',
        weight: 215,
        teamAbbreviation: 'OKC',
    },
];

// NBA Games for 2024 season
const nbaGames = [
    // Charlotte Hornets Games
    {
        date: new Date('2024-01-03'),
        season: '2024',
        homeTeam: 'CHA',
        visitorTeam: 'BOS',
        homeScore: 111,
        visitorScore: 120,
    },
    {
        date: new Date('2024-01-07'),
        season: '2024',
        homeTeam: 'CHA',
        visitorTeam: 'MIL',
        homeScore: 108,
        visitorScore: 123,
    },
    {
        date: new Date('2024-01-12'),
        season: '2024',
        homeTeam: 'PHX',
        visitorTeam: 'CHA',
        homeScore: 115,
        visitorScore: 104,
    },
    {
        date: new Date('2024-01-15'),
        season: '2024',
        homeTeam: 'LAL',
        visitorTeam: 'CHA',
        homeScore: 124,
        visitorScore: 118,
    },
    {
        date: new Date('2024-01-19'),
        season: '2024',
        homeTeam: 'CHA',
        visitorTeam: 'OKC',
        homeScore: 109,
        visitorScore: 116,
    },
    {
        date: new Date('2024-01-22'),
        season: '2024',
        homeTeam: 'MIA',
        visitorTeam: 'CHA',
        homeScore: 112,
        visitorScore: 102,
    },
    {
        date: new Date('2024-01-26'),
        season: '2024',
        homeTeam: 'CHA',
        visitorTeam: 'GSW',
        homeScore: 115,
        visitorScore: 121,
    },
    {
        date: new Date('2024-01-29'),
        season: '2024',
        homeTeam: 'DAL',
        visitorTeam: 'CHA',
        homeScore: 118,
        visitorScore: 110,
    },
    {
        date: new Date('2024-02-02'),
        season: '2024',
        homeTeam: 'CHA',
        visitorTeam: 'PHI',
        homeScore: 107,
        visitorScore: 115,
    },
    {
        date: new Date('2024-02-05'),
        season: '2024',
        homeTeam: 'DEN',
        visitorTeam: 'CHA',
        homeScore: 128,
        visitorScore: 112,
    },

    // Boston Celtics Games
    {
        date: new Date('2024-01-02'),
        season: '2024',
        homeTeam: 'BOS',
        visitorTeam: 'OKC',
        homeScore: 127,
        visitorScore: 115,
    },
    {
        date: new Date('2024-01-05'),
        season: '2024',
        homeTeam: 'BOS',
        visitorTeam: 'GSW',
        homeScore: 132,
        visitorScore: 125,
    },
    {
        date: new Date('2024-01-10'),
        season: '2024',
        homeTeam: 'MIL',
        visitorTeam: 'BOS',
        homeScore: 118,
        visitorScore: 124,
    },
    {
        date: new Date('2024-01-13'),
        season: '2024',
        homeTeam: 'BOS',
        visitorTeam: 'PHI',
        homeScore: 119,
        visitorScore: 110,
    },
    {
        date: new Date('2024-01-17'),
        season: '2024',
        homeTeam: 'DAL',
        visitorTeam: 'BOS',
        homeScore: 115,
        visitorScore: 121,
    },
    {
        date: new Date('2024-01-20'),
        season: '2024',
        homeTeam: 'BOS',
        visitorTeam: 'DEN',
        homeScore: 128,
        visitorScore: 124,
    },
    {
        date: new Date('2024-01-24'),
        season: '2024',
        homeTeam: 'MIA',
        visitorTeam: 'BOS',
        homeScore: 108,
        visitorScore: 116,
    },
    {
        date: new Date('2024-01-27'),
        season: '2024',
        homeTeam: 'BOS',
        visitorTeam: 'LAL',
        homeScore: 125,
        visitorScore: 118,
    },
    {
        date: new Date('2024-01-31'),
        season: '2024',
        homeTeam: 'PHX',
        visitorTeam: 'BOS',
        homeScore: 112,
        visitorScore: 120,
    },
    {
        date: new Date('2024-02-03'),
        season: '2024',
        homeTeam: 'BOS',
        visitorTeam: 'CHA',
        homeScore: 122,
        visitorScore: 105,
    },

    // Milwaukee Bucks Games
    {
        date: new Date('2024-01-04'),
        season: '2024',
        homeTeam: 'MIL',
        visitorTeam: 'PHI',
        homeScore: 121,
        visitorScore: 116,
    },
    {
        date: new Date('2024-01-08'),
        season: '2024',
        homeTeam: 'MIL',
        visitorTeam: 'LAL',
        homeScore: 128,
        visitorScore: 120,
    },
    {
        date: new Date('2024-01-12'),
        season: '2024',
        homeTeam: 'GSW',
        visitorTeam: 'MIL',
        homeScore: 118,
        visitorScore: 125,
    },
    {
        date: new Date('2024-01-16'),
        season: '2024',
        homeTeam: 'MIL',
        visitorTeam: 'DEN',
        homeScore: 115,
        visitorScore: 122,
    },
    {
        date: new Date('2024-01-19'),
        season: '2024',
        homeTeam: 'DAL',
        visitorTeam: 'MIL',
        homeScore: 112,
        visitorScore: 119,
    },
    {
        date: new Date('2024-01-23'),
        season: '2024',
        homeTeam: 'MIL',
        visitorTeam: 'PHX',
        homeScore: 126,
        visitorScore: 118,
    },
    {
        date: new Date('2024-01-26'),
        season: '2024',
        homeTeam: 'OKC',
        visitorTeam: 'MIL',
        homeScore: 114,
        visitorScore: 120,
    },
    {
        date: new Date('2024-01-30'),
        season: '2024',
        homeTeam: 'MIL',
        visitorTeam: 'MIA',
        homeScore: 117,
        visitorScore: 108,
    },
    {
        date: new Date('2024-02-02'),
        season: '2024',
        homeTeam: 'CHA',
        visitorTeam: 'MIL',
        homeScore: 105,
        visitorScore: 124,
    },
    {
        date: new Date('2024-02-06'),
        season: '2024',
        homeTeam: 'MIL',
        visitorTeam: 'BOS',
        homeScore: 118,
        visitorScore: 122,
    },

    // Denver Nuggets Games
    {
        date: new Date('2024-01-03'),
        season: '2024',
        homeTeam: 'DEN',
        visitorTeam: 'DAL',
        homeScore: 124,
        visitorScore: 115,
    },
    {
        date: new Date('2024-01-06'),
        season: '2024',
        homeTeam: 'DEN',
        visitorTeam: 'PHX',
        homeScore: 118,
        visitorScore: 112,
    },
    {
        date: new Date('2024-01-11'),
        season: '2024',
        homeTeam: 'LAL',
        visitorTeam: 'DEN',
        homeScore: 115,
        visitorScore: 121,
    },
    {
        date: new Date('2024-01-14'),
        season: '2024',
        homeTeam: 'DEN',
        visitorTeam: 'GSW',
        homeScore: 128,
        visitorScore: 120,
    },
    {
        date: new Date('2024-01-18'),
        season: '2024',
        homeTeam: 'PHI',
        visitorTeam: 'DEN',
        homeScore: 116,
        visitorScore: 122,
    },
    {
        date: new Date('2024-01-22'),
        season: '2024',
        homeTeam: 'DEN',
        visitorTeam: 'OKC',
        homeScore: 125,
        visitorScore: 118,
    },
    {
        date: new Date('2024-01-25'),
        season: '2024',
        homeTeam: 'MIA',
        visitorTeam: 'DEN',
        homeScore: 110,
        visitorScore: 119,
    },
    {
        date: new Date('2024-01-29'),
        season: '2024',
        homeTeam: 'DEN',
        visitorTeam: 'CHA',
        homeScore: 126,
        visitorScore: 108,
    },
    {
        date: new Date('2024-02-01'),
        season: '2024',
        homeTeam: 'BOS',
        visitorTeam: 'DEN',
        homeScore: 121,
        visitorScore: 118,
    },
    {
        date: new Date('2024-02-04'),
        season: '2024',
        homeTeam: 'DEN',
        visitorTeam: 'MIL',
        homeScore: 120,
        visitorScore: 116,
    },

    // Phoenix Suns Games
    {
        date: new Date('2024-01-02'),
        season: '2024',
        homeTeam: 'PHX',
        visitorTeam: 'MIA',
        homeScore: 116,
        visitorScore: 108,
    },
    {
        date: new Date('2024-01-05'),
        season: '2024',
        homeTeam: 'PHX',
        visitorTeam: 'LAL',
        homeScore: 122,
        visitorScore: 118,
    },
    {
        date: new Date('2024-01-09'),
        season: '2024',
        homeTeam: 'GSW',
        visitorTeam: 'PHX',
        homeScore: 115,
        visitorScore: 120,
    },
    {
        date: new Date('2024-01-13'),
        season: '2024',
        homeTeam: 'PHX',
        visitorTeam: 'OKC',
        homeScore: 118,
        visitorScore: 112,
    },
    {
        date: new Date('2024-01-16'),
        season: '2024',
        homeTeam: 'DAL',
        visitorTeam: 'PHX',
        homeScore: 114,
        visitorScore: 121,
    },
    {
        date: new Date('2024-01-20'),
        season: '2024',
        homeTeam: 'PHX',
        visitorTeam: 'CHA',
        homeScore: 125,
        visitorScore: 110,
    },
    {
        date: new Date('2024-01-24'),
        season: '2024',
        homeTeam: 'PHI',
        visitorTeam: 'PHX',
        homeScore: 116,
        visitorScore: 119,
    },
    {
        date: new Date('2024-01-27'),
        season: '2024',
        homeTeam: 'PHX',
        visitorTeam: 'DEN',
        homeScore: 115,
        visitorScore: 122,
    },
    {
        date: new Date('2024-01-31'),
        season: '2024',
        homeTeam: 'BOS',
        visitorTeam: 'PHX',
        homeScore: 124,
        visitorScore: 118,
    },
    {
        date: new Date('2024-02-03'),
        season: '2024',
        homeTeam: 'PHX',
        visitorTeam: 'MIL',
        homeScore: 120,
        visitorScore: 125,
    },

    // Los Angeles Lakers Games
    {
        date: new Date('2024-01-03'),
        season: '2024',
        homeTeam: 'LAL',
        visitorTeam: 'MIA',
        homeScore: 121,
        visitorScore: 112,
    },
    {
        date: new Date('2024-01-07'),
        season: '2024',
        homeTeam: 'LAL',
        visitorTeam: 'PHI',
        homeScore: 118,
        visitorScore: 115,
    },
    {
        date: new Date('2024-01-11'),
        season: '2024',
        homeTeam: 'GSW',
        visitorTeam: 'LAL',
        homeScore: 112,
        visitorScore: 119,
    },
    {
        date: new Date('2024-01-15'),
        season: '2024',
        homeTeam: 'LAL',
        visitorTeam: 'OKC',
        homeScore: 125,
        visitorScore: 120,
    },
    {
        date: new Date('2024-01-18'),
        season: '2024',
        homeTeam: 'DAL',
        visitorTeam: 'LAL',
        homeScore: 116,
        visitorScore: 122,
    },
    {
        date: new Date('2024-01-22'),
        season: '2024',
        homeTeam: 'LAL',
        visitorTeam: 'CHA',
        homeScore: 128,
        visitorScore: 115,
    },
    {
        date: new Date('2024-01-25'),
        season: '2024',
        homeTeam: 'PHX',
        visitorTeam: 'LAL',
        homeScore: 118,
        visitorScore: 124,
    },
    {
        date: new Date('2024-01-29'),
        season: '2024',
        homeTeam: 'LAL',
        visitorTeam: 'DEN',
        homeScore: 115,
        visitorScore: 121,
    },
    {
        date: new Date('2024-02-01'),
        season: '2024',
        homeTeam: 'BOS',
        visitorTeam: 'LAL',
        homeScore: 122,
        visitorScore: 116,
    },
    {
        date: new Date('2024-02-04'),
        season: '2024',
        homeTeam: 'LAL',
        visitorTeam: 'MIL',
        homeScore: 120,
        visitorScore: 118,
    },
];

// Helper function to generate realistic player stats
function generatePlayerStats(totalTeamScore: number, isStarter: boolean) {
    const minutesPlayed = isStarter
        ? faker.number.int({ min: 24, max: 38 })
        : faker.number.int({ min: 8, max: 24 });
    const fgMade = isStarter
        ? faker.number.int({ min: 3, max: 12 })
        : faker.number.int({ min: 1, max: 6 });
    const fgAttempts = fgMade + faker.number.int({ min: 2, max: 8 });
    const fgThreeMade = isStarter
        ? faker.number.int({ min: 0, max: 5 })
        : faker.number.int({ min: 0, max: 3 });
    const fgThreeAtt = fgThreeMade + faker.number.int({ min: 1, max: 4 });
    const ftMade = isStarter
        ? faker.number.int({ min: 0, max: 8 })
        : faker.number.int({ min: 0, max: 4 });
    const ftAtt = ftMade + faker.number.int({ min: 0, max: 3 });
    const points = (fgMade - fgThreeMade) * 2 + fgThreeMade * 3 + ftMade;

    return {
        minutesPlayed,
        fgMade,
        fgAttempts,
        fgThreeMade,
        fgThreeAtt,
        ftMade,
        ftAtt,
        offensiveRebounds: faker.number.int({ min: 0, max: isStarter ? 4 : 2 }),
        defensiveRebounds: faker.number.int({ min: 0, max: isStarter ? 8 : 4 }),
        assists: faker.number.int({ min: 0, max: isStarter ? 8 : 4 }),
        steals: faker.number.int({ min: 0, max: isStarter ? 3 : 2 }),
        blocks: faker.number.int({ min: 0, max: isStarter ? 3 : 1 }),
        turnovers: faker.number.int({ min: 0, max: isStarter ? 4 : 2 }),
        points,
    };
}

async function seed() {
    console.log('Running seed...');

    try {
        // Insert all NBA teams
        for (const team of nbaTeams) {
            const teamId = nanoid();
            await db.insert(teamTable).values({
                id: teamId,
                ...team,
            });
            teamIdMap.set(team.abbreviation, teamId);
        }

        // Insert all NBA players
        const playerIds = new Map<string, string>();
        for (const player of nbaPlayers) {
            const teamId = teamIdMap.get(player.teamAbbreviation);
            if (!teamId) {
                throw new Error(
                    `Team ID not found for abbreviation: ${player.teamAbbreviation}`,
                );
            }

            const playerId = nanoid();
            await db.insert(playerTable).values({
                id: playerId,
                name: player.name,
                position: player.position,
                height: player.height,
                weight: player.weight,
                teamId: teamId,
            });
            playerIds.set(player.name, playerId);
        }

        // Insert all NBA games
        const gameIds = new Map<string, string>();
        for (const game of nbaGames) {
            const homeTeamId = teamIdMap.get(game.homeTeam);
            const visitorTeamId = teamIdMap.get(game.visitorTeam);

            if (!homeTeamId || !visitorTeamId) {
                throw new Error(
                    `Team ID not found for game: ${game.homeTeam} vs ${game.visitorTeam}`,
                );
            }

            const gameId = nanoid();
            await db.insert(gameTable).values({
                id: gameId,
                date: game.date,
                season: game.season,
                homeTeamId: homeTeamId,
                visitorTeamId: visitorTeamId,
                homeTeamScore: game.homeScore,
                visitorTeamScore: game.visitorScore,
            });
            gameIds.set(
                `${game.homeTeam}-${game.visitorTeam}-${game.date.toISOString()}`,
                gameId,
            );
        }

        // Insert player game stats for Hornets games
        const hornetsPlayers = nbaPlayers.filter(
            (p) => p.teamAbbreviation === 'CHA',
        );
        const hornetsGames = nbaGames.filter(
            (g) => g.homeTeam === 'CHA' || g.visitorTeam === 'CHA',
        );
        const starters = [
            'LaMelo Ball',
            'Brandon Miller',
            'Miles Bridges',
            'Mark Williams',
            'Grant Williams',
        ];

        for (const game of hornetsGames) {
            const gameId = gameIds.get(
                `${game.homeTeam}-${game.visitorTeam}-${game.date.toISOString()}`,
            );
            if (!gameId) continue;

            const isHome = game.homeTeam === 'CHA';
            const teamScore = isHome ? game.homeScore : game.visitorScore;
            let remainingPoints = teamScore;

            // Generate stats for starters first
            for (const player of hornetsPlayers) {
                const playerId = playerIds.get(player.name);
                if (!playerId) continue;

                const isStarter = starters.includes(player.name);
                const stats = generatePlayerStats(teamScore, isStarter);

                // Adjust points if we're going over the team total
                if (stats.points > remainingPoints) {
                    const oldPoints = stats.points;
                    stats.points = Math.max(0, remainingPoints);
                    const ratio = stats.points / oldPoints;
                    stats.fgMade = Math.floor(stats.fgMade * ratio);
                    stats.fgThreeMade = Math.floor(stats.fgThreeMade * ratio);
                    stats.ftMade = Math.floor(stats.ftMade * ratio);
                }
                remainingPoints -= stats.points;

                await db.insert(playerGameStatsTable).values({
                    id: nanoid(),
                    gameId,
                    playerId,
                    ...stats,
                });
            }
        }

        console.log(
            'Successfully seeded NBA teams, players, games, and player statistics',
        );
        process.exit(0);
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
}

seed().catch((err) => {
    console.error('Seed failed');
    console.error(err);
    process.exit(1);
});
