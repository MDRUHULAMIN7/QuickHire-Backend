export type TJob = {
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  employment_type: 'Full Time' | 'Part Time' | 'Contract' | 'Internship' | 'Remote';
  tags?: string[];
  company_logo_url?: string;
  createdAt?: Date;
};
