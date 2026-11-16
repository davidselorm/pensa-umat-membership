export type YearLevel = 'Level 100' | 'Level 200' | 'Level 300' | 'Level 400' | 'Postgraduate';

export type MembershipStatus = 'Pentecost Member' | 'Associate';

export type ChurchDepartment =
  | 'Choir'
  | 'Organizing'
  | 'Media'
  | 'Ushering'
  | 'Instrumentalist'
  | 'Prayer / Evangelism'
  | 'Protocol'
  | 'None / General Member';

export interface FamilyUnit {
  id: string;
  name: string;
  leader_name: string;
  leader_phone: string;
  meeting_info?: string;
  member_count?: number;
  created_at: string;
}

export interface Member {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  dob: string;
  programme: string;
  year_level: YearLevel;
  hostel: string;
  membership_status: MembershipStatus;
  home_location: string;
  department: ChurchDepartment;
  family_unit_id: string | null;
  family_unit_name?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Executive {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface DashboardStats {
  totalMembers: number;
  pentecostCount: number;
  associateCount: number;
  unassignedCount: number;
  levelBreakdown: Record<string, number>;
  departmentBreakdown: Record<string, number>;
}

export const YEAR_LEVELS: YearLevel[] = [
  'Level 100',
  'Level 200',
  'Level 300',
  'Level 400',
  'Postgraduate',
];

export const MEMBERSHIP_STATUSES: MembershipStatus[] = [
  'Pentecost Member',
  'Associate',
];

export const CHURCH_DEPARTMENTS: ChurchDepartment[] = [
  'Choir',
  'Organizing',
  'Media',
  'Ushering',
  'Instrumentalist',
  'Prayer / Evangelism',
  'Protocol',
  'None / General Member',
];

export const SUGGESTED_HOSTELS = [
  'Chamber of Mines Hall',
  'Gold Refinery Hall',
  'KT Hall',
  'University Hall',
  'Executive Hostel (Off-Campus)',
  'Grace Hostel (Off-Campus)',
  'Jerusalem Hostel (Off-Campus)',
  'Tarkwa Banso (Off-Campus)',
  'New Town (Off-Campus)',
  'Railway Quarters (Off-Campus)',
  'Aboso (Off-Campus)',
  'Other Off-Campus Hostel'
];

export const SUGGESTED_PROGRAMMES = [
  'BSc Computer Science and Engineering',
  'BSc Mining Engineering',
  'BSc Electrical and Electronic Engineering',
  'BSc Mechanical Engineering',
  'BSc Petroleum Engineering',
  'BSc Minerals Engineering',
  'BSc Geomatic Engineering',
  'BSc Environmental and Safety Engineering',
  'BSc Renewable Energy Engineering',
  'BSc Mathematical Sciences',
  'BSc Geological Engineering',
  'BSc Petroleum Geosciences and Engineering',
  'Diploma in General Engineering',
  'Postgraduate / Masters Programme'
];
