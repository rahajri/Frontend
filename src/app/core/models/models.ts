import { data } from 'src/app/features-modules/employer/milestones/tasks/tasks.component';

export interface pageSelection {
  skip: number;
  limit: number;
}
export interface apiResultFormat {
  data: [];
  totalData: number;
}
export interface empprojects {
  id: number;
  name: string;
  image: string;
  company: string;
  content: string;
  type: string;
  img: string;
  days: string;
  price: string;
  day: string;
  proposals: string;
  viewproposals?: boolean;
  viewdetails?: boolean;
  date: string;
  worktime: string;
  workingday: string;
  employeename: string;
  review: string;
  dates: string;
}
export interface completed {
  id: number;
  order: string;
  image: string;
  name: string;
  mail: string;
  date: string | number;
  availability: string;
  money: string | number;
  balance: string | number;
  status: string;
}
export interface freelancer {
  id: number;
  image: string;
  name: string;
  mail: string;
  expert: string;
  verify: string;
  balance: string | number;
  joined: string | number;
  last: '10 May 2022';
  availability: string;
}
export interface project {
  id: number;
  image: string;
  para: string;
  amount: number;
  width: number;
  technology: string;
  company: string;
  startdate: number;
  duedate: number;
}
export interface Offer {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date | null;
  publicationDate: Date | null;
  expectedDuration: number;
  timeUnit: string;
  createdAt: Date;
  company: Company;
  contractType: {
    description: string;
    id: string;
    isRenewable: boolean;
  };
  job: {
    name: string;
  };
  city: {
    name: string;
  };
  status: {
    name: string;
    description: string;
  };
}

export interface Company {
  id: string;
  name: string;
  siret: string;
  nafTitle: string;
  naf: string;
  category: string;
  workforce: number; // Changed to a number since JSON shows it as numeric
  createdAt: string; // ISO string format in JSON
  updatedAt: string; // ISO string format in JSON
  email?: string | null; // Optional and nullable
  phone?: string | null; // Optional and nullable
  message?: string | null; // Optional and nullable
  location?: {
    id: string;
    address: string;
    addressLine2?: string | null; // Optional and nullable secondary address line
    postalCode: {
      code: string;
      id: string;
    };
    city?: {
      id: string;
      name: string;
      department?: {
        id: string;
        name: string;
        region?: {
          id: string;
          name: string;
        };
      };
    };
  };
  status?: {
    id: string;
    name: string;
    description?: string;
    context: string;
  };
  employees?: Array<{
    id: string;
    lastName: string;
    firstName: string;
    email: string;
    password: string;
    phone?: string | null;
    birthDate?: string | null; // Optional and nullable
    age?: number | null; // Optional and nullable
    role: string;
    emailVerifiedAt?: string | null; // Optional and nullable
    profileTitle?: string | null; // Optional and nullable
    aiId?: string | null; // Optional and nullable
    createdAt: string;
    updatedAt: string;
    position?: string | null; // Optional and nullable
  }>;
  socialMedia: {
    id: string;
    instagram: string | null;
    facebook: string | null;
    linkedIn: string | null;
  };
}

export interface Candidate {
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  phone: string | null;
  birthDate: null;
  age: null;
  role: string;
  emailVerifiedAt: Date | null;
  profileTitle: string | null;
  aiId: null;
  createdAt: Date;
  updatedAt: Date;
  lastConnection: Date | null;
  profileUpdatedAt: Date | null;
  image: string | null;
  status: {
    id: string;
    name: string;
    description: string;
    context: string;
  };
}

export interface Profile {
  age: string;
  startDate: string;
  expectedDuration: number;
  email: string | null;
  phone: string | null;
  firstName: string | null;
  lastName: string | null;
  position: string | null;
  role: string | null;
  profileTitle: string | null;
  birthDate: Date | null;
  updatedAt: Date;
  createdAt: Date;
  company: {
    name: string;
    siret: string;
    email: string | null;
    phone: string | null;
    naf: string;
    nafTitle: string;
    category: string;
    workforce: number;
    message: string;
    establishedDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
    location: {
      postalCode: {
        code: string;
      };
      city: {
        name: string;
        department: {
          name: string;
          region: {
            name: string;
          };
        };
      };
      address: string;
      addressLine2: string;
    };
  };
  status: {
    name: string;
    description: string;
    context: string;
  };
}
export interface User {
  age: string;
  startDate: string;
  expectedDuration: number;
  email: string | null;
  phone: string | null;
  firstName: string | null;
  lastName: string | null;
  position: string | null;
  role: string | null;
  profileTitle: string | null;
  birthDate: Date | null;
  updatedAt: Date;
  createdAt: Date;
  company: {
    name: string;
    siret: string;
    email: string | null;
    phone: string | null;
    naf: string;
    nafTitle: string;
    category: string;
    workforce: number;
    message: string;
    establishedDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
    location: {
      postalCode: {
        code: string;
      };
      city: {
        name: string;
        department: {
          name: string;
          region: {
            name: string;
          };
        };
      };
      address: string;
      addressLine2: string;
    };
  };
  status: {
    name: string;
    description: string;
    context: string;
  };
}

export interface category {
  id: number;
  category: string;
}
export interface employer {
  id: number;
  name: string;
  plan: string;
  type: string;
  payment: string;
  start: number;
  end: number;
  status: string;
}
export interface skills {
  id: number;
  skills: string;
  slug: string;
}
export interface defaultdata {
  id: number;
  name: string;
  position: string;
  office: string;
  age: number;
  startdate: number;
  salary: number;
}
export interface adminProviders {
  id: number;
  name: string;
  image: string;
  company: string;
  contact: string;
  website: string;
  projects: number;
  status: string;
}
export interface adminrole {
  projects: string;
  status: string;
}
export interface socialLink {
  icon: string;
}
export interface IdentityList {
  id: number;
  name: string;
  contact: number;
  passport: number;
  image: string;
  address: string;
}
export interface task {
  name: string;
  milestone: string;
  para: string;
  availability: string;
}
export interface invoice {
  invoices: string | number;
  client: string;
  lastvisit: string | number;
  amount: string;
  duedate: string | number;
  availability: string;
  paidon: string | number;
}
export interface freeprojects {
  id: number;
  img: string;
  company: string;
  role: string;
  ago: string;
  city: string;
  role2: string;
  role3: string;
  role4: string;
  price: string;
  price2: string;
  days: string;
  proposal: string;
  type: string;
}
export interface freelancerlist {
  id: number;
  image: string;
  name: string;
  role: string;
  city: string;
  rating: string;
  role2: string;
  role3: string;
  role4: string;
  price: string;
  viewlancer: boolean;
  viewfree: boolean;
}
export interface freelist {
  id: number;
  name: string;
  company: string;
  image: string;
  content: string;
  customer: string;
  amount: string;
  date1: number | string;
  level: string;
  type: string;
  money: string;
  days: string | number;
  date: string | number;
  review: string;
  para: string;
}
export interface payment {
  name: string;
  price: string;
  date: string | number;
  type: string;
  status: string;
}
export interface freecompleted {
  id: number;
  name: string;
  company: string;
  image: string;
  content: string;
  amount: string;
  level: string;
  date: string | number;
  review: string;
}
export interface file {
  image: string;
  title: string;
  para: string;
  type: string;
  size: string | number;
}
export interface milestone {
  name: string;
  price: string;
  percentage: string;
  startdate: string;
  enddate: string;
  availability: string;
  full: string;
  action: string;
}
export interface SidebarItem {
  title: string;
  base: string;
  showAsTab: boolean;
  separateRoute: boolean;
  route?: string;
  menu: SidebarMenuItem[];
}
export interface SidebarMenuItem {
  menuValue: string;
  route?: string;
  hasSubRoute: boolean;
  showSubRoute: boolean;
  base: string;
  page: string;
  last: string;
  subMenus: SidebarMenuItem[];
}
export interface SidebarData {
  title: string;
  base: string;
  showAsTab: boolean;
  separateRoute: boolean;
  route?: string;
  page: string;
  icon: string;
  hasSubRoute: boolean;
  menu: string;
}
export interface subMenus {
  url: string;
  separateRoute: boolean;
  menuValue: string;
  tittle: string;
  icon: string;
  showAsTab: boolean;
  showSubRoute: boolean;
  title: string;
  route?: string;
  base?: string;
}
export interface mainMenus {
  menu: MenuItem[];
  separateRoute: boolean;
  menuValue: string;
  tittle: string;
  route: string;
  base: string;
  icon: string;
  showAsTab: boolean;
  active: boolean;
  showSubRoute: boolean;
  url: string;
}
export interface mainMenu {
  menu: MenuItem[];
  separateRoute: boolean;
  menuValue: string;
  tittle: string;
  route: string;
  base: string;
  icon: string;
  showAsTab: boolean;
  url: string;
}
export interface Menu {
  menuValue: string;
  showSubRoute: boolean;
  route: string;
  hasSubRoute: boolean;
  icon: string;
  base: string;
  url: string;
}
export interface MenuItem {
  menuValue: string;
  showSubRoute: boolean;
  route: string;
  hasSubRoute: boolean;
  icon: string;
  base: string;
  url: string;
}

export interface SideBarData {
  tittle: string;
  active: boolean;
  icon: string;
  showAsTab: boolean;
  separateRoute: boolean;
  menu: MenuItem[];
  menuValue: string;
  showSubRoute: boolean;
  route: string;
  hasSubRoute: boolean;
  base: string;
  subMenus: subMenus[];
  Mainmenu: mainMenu[];
  url: string;
}
export interface url {
  url: string;
}
export interface files {
  title: string;
  description: string;
  type: string;
  size: string;
  img: string;
}
export interface freelancerMilestones {
  name: string;
  budget: string;
  progress: string;
  startDate: string;
  dueDate: string;
  status: string;
  percent: string;
  action: string;
}
export interface freelancerPayments {
  name: string;
  typeOfPayment: string;
  budget: string;
  status: string;
  datePaid: string;
}
export interface adminDashboard {
  image: string;
  name: string;
  designation: string;
  para: string;
  category: string;
  id: number;
}
export interface adminReports {
  id: number;
  name: string;
  role: string;
  project: string;
  startdate: string;
  enddate: string;
  freelancer: string;
  milestone: string;
  status: string;
  bidding: string;
  base: string;
  state: string;
  invoice: string;
  paid: string;
}
export interface adminEarning {
  id: number;
  transaction: string;
  refernce: string;
  project: string;
  value: string;
  income: string;
  payment: string;
}
export interface freelancerTask {
  taskName: string;
  milestones: string;
  description: string;
  status: string;
}
