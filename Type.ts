export type RegistrationFormDataType = {
  firstName: string;
  lastName: string;
  nameWithInitials: string;
  universityID: string;
  contactNo: string;
  degree: string;
  department: string;
  cv: FileList;
  photo: FileList;
  email: string;
};

export type RegistrationFormDataSendType = {
  firstName: string;
  lastName: string;
  nameWithInitials: string;
  universityID: string;
  contactNo: string;
  degree: string;
  department: string;
  cvUrl: string;
  imgUrl: string;
  userId: string;
};

export interface CV {
  cv: FileList;
}

export interface Candidate {
  candidate_id: string;
  firstName: string;
  lastName: string;
  nameWithInitials: string;
  universityID: string;
  contactNo: string;
  department: string;
  degree: string;
  cvUrl: string;
  imgUrl: string;
  createdAt: string;
  updatedAt: string;
  prefCompany1: string | null;
  prefCompany2: string | null;
  prefCompany3: string | null;
  prefCompany4: string | null;
  user: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: string | null;
  image: string | null;
  password: string;
  emailVerifyStatus: boolean;
  createdAt: string;
  updatedAt: string;
  passwordResetToken: string;
  passwordResetTokenExpire: string;
  role: string;
}

export interface Company {
  company_id: string;
  company_name: string;
  feedback: Feedback[];
}

export interface Feedback {
  feedback_id: string;
  feedback: string;
  candidate_id: string;
  company_id: string;
  Candidate: Candidate;
  Company: Company;
}

export interface Panelist {
  panelist_id: string;
  pannel_number: Number;
  company_id: string;
  allocation: Allocation[];
  company: Company;
  user: User;
}
export interface Allocation {
  allocation_id: string;
  allocation_date: string;
  allocation_timeSlot: string;
  allocated_panel_number: string;
  attendance: boolean;
  allocation_status: string;
  candidate_id: string;
  company_id: string;
  panelist_id: string;
  Candidate: Candidate;
  Company: Company;
  Panelist: Panelist;
}
