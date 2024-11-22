import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, BehaviorSubject, map } from 'rxjs';
import { routes } from '../helpers/routes/routes';
import {
  SideBarData,
  apiResultFormat,
  empprojects,
  freecompleted,
  freelancerlist,
  freelist,
  freeprojects,
} from '../models/models';
import { SidemenuItem } from 'src/app/features-modules/employer/sidemenu/sidemenu.component';
import { AdminSidebar, FreelancerSidebarItem, header } from '../models/sidebar-model';

@Injectable({
  providedIn: 'root',
})
export class ShareDataService {
  messages = '';
  message: BehaviorSubject<string>;

  private _listners = new Subject<string>();

  constructor(private http: HttpClient) {
    this.message = new BehaviorSubject(this.messages);
  }

  listen(): Observable<string> {
    return this._listners.asObservable();
  }
  nextmessage(data: string) {
    this.message.next(data);
  }

  filter(filterBy: string) {
    this._listners.next(filterBy);
  }
  public loadProject() {
    return this.http.get<apiResultFormat>('assets/json/adminProject.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public loadDashboardData() {
    return this.http
      .get<apiResultFormat>('assets/json/adminDashboard.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public loadCategoriesData() {
    return this.http
      .get<apiResultFormat>('assets/json/categoriesData.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public freelancerActiveData() {
    return this.http
      .get<apiResultFormat>('assets/json/freelanceractivedata.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public adminDepositList() {
    return this.http.get<apiResultFormat>('assets/json/adminDeposit.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public subscriberEmployer() {
    return this.http
      .get<apiResultFormat>('assets/json/subscriberEmployer.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public adminProviderList() {
    return this.http
      .get<apiResultFormat>('assets/json/adminProvider.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public subscriberFreelancer() {
    return this.http
      .get<apiResultFormat>('assets/json/subscriberFreelancer.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public adminEarning() {
    return this.http.get<apiResultFormat>('assets/json/adminEarning.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public adminReports() {
    return this.http.get<apiResultFormat>('assets/json/adminReports.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public adminRoleList() {
    return this.http
      .get<apiResultFormat>('assets/json/adminRoleList.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public adminSkillList() {
    return this.http
      .get<apiResultFormat>('assets/json/adminSkillsList.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public adminIdentityList() {
    return this.http
      .get<apiResultFormat>('assets/json/adminIdentityList.json')
      .pipe(
        map((res: apiResultFormat) => {
          return res;
        })
      );
  }
  public socialLink() {
    return this.http.get<apiResultFormat>('assets/json/socialLink.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public defaultData() {
    return this.http.get<apiResultFormat>('assets/json/defaultData.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getFiles() {
    return this.http.get<apiResultFormat>('assets/json/files.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getFreelancerMilestones() {
    return this.http.get<apiResultFormat>('assets/json/freelancer-milestones.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getFreelancerPayment() {
    return this.http.get<apiResultFormat>('assets/json/freelancer-payment.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getEmployerPayment() {
    return this.http.get<apiResultFormat>('assets/json/employer-payment.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTask() {
    return this.http.get<apiResultFormat>('assets/json/employer-task.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getEmployerMilestone() {
    return this.http.get<apiResultFormat>('assets/json/employer-milestone.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getFreelancertask() {
    return this.http.get<apiResultFormat>('assets/json/freelancer-task.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  empprojects = [
    {
      id: 1,
      name: 'Hannah Finn',
      image: 'assets/img/user/user-04.jpg',
      company: 'Dreamguystech',
      content: 'Website Designer Required For Directory Theme',
      type: 'Project type',
      img: 'assets/img/en.png',
      days: '15',
      price: 'Price',
      day: '$500',
      proposals: '12',
      viewproposals: false,
      viewdetails: true,
      date: 'Hired on 19 Sep 2023 ',
      worktime: 'Hourly',
      workingday: '4 Days Left',
      employeename: 'Hannah Finn',
      review: '',
      dates: 'Expired on 23 Sep 2023',
    },
    {
      id: 2,
      name: 'Hannah',
      image: 'assets/img/user/table-avatar-02.jpg',
      company: 'Dreamguystech',
      content: 'Landing Page Redesign / Sales Page Redesign ',
      type: 'Project type',
      img: 'assets/img/en.png',
      days: '$280',
      price: 'Price',
      day: '$280',
      proposals: '08',
      viewproposals: false,
      viewdetails: false,
      date: 'Hired on 23 Sep 2023 ',
      worktime: 'Fixed',
      workingday: '5 Days Left',
      employeename: 'Bolethe Fleischer',
      review: 'Write Review',
      dates: 'Expired on 27 Sep 2023',
    },
    {
      id: 3,
      name: 'Hannah',
      image: 'assets/img/user/table-avatar-03.jpg',
      company: 'Dreamguystech',
      content: 'WooCommerce Product Page Back Up Restoration',
      type: 'Project type',
      img: 'assets/img/en.png',
      days: '$700',
      price: 'Price',
      day: '$700',
      proposals: '27',
      date: 'Hired on 07 Oct 2023 ',
      viewproposals: false,
      viewdetails: true,
      worktime: 'Hourly',
      workingday: '3 Days Left',
      employeename: 'Gerth Enoksen',
      review: '',
      dates: 'Expired on 07 Oct 2023',
    },
    {
      id: 4,
      name: 'Hannah',
      image: 'assets/img/user/table-avatar-04.jpg',
      company: 'Dreamguystech',
      content: 'Laravel Backend Developer to finish ongoing project',
      type: 'Project type',
      img: 'assets/img/en.png',
      days: '34',
      price: 'Price',
      day: '$300',
      proposals: '16',
      date: 'Hired on 17 Oct 2023 ',
      viewproposals: false,
      viewdetails: true,
      worktime: 'Fixed',
      workingday: '8 Days Left',
      employeename: 'Larry Higdon',
      review: '',
      dates: 'Expired on 12 Oct 2023',
    },
    {
      id: 5,
      name: 'Hannah',
      image: 'assets/img/user/user-02.jpg',
      company: 'Dreamguystech',
      content: '3D Renders and Amazon Product Store images/Video',
      type: 'Project type',
      img: 'assets/img/en.png',
      days: '$300',
      price: 'Price',
      day: '$300',
      proposals: '13',
      date: 'Hired on 17 Oct 2023 ',
      viewproposals: false,
      viewdetails: true,
      worktime: 'Hourly',
      workingday: '8 Days Left',
      employeename: 'Nicole Estrada',
      review: '',
      dates: 'Expired on 17 Oct 2023',
    },
    {
      id: 6,
      name: 'Hannah',
      image: 'assets/img/user/user-04.jpg',
      company: 'Dreamguystech',
      content: 'Website Designer Required For Directory Theme',
      type: 'Project type',
      img: 'assets/img/en.png',
      days: '35',
      price: 'Price',
      day: '$500',
      date: 'Hired on 19 Sep 2023 ',
      proposals: '27',
      viewproposals: false,
      viewdetails: true,
      worktime: 'Fixed',
      workingday: '4 Days Left',
      employeename: 'Hannah Finn',
      review: '',
      dates: 'Expired on 19 Sep 2023',
    },
  ];
  public ManageUsers: BehaviorSubject<Array<empprojects>> = new BehaviorSubject<
    Array<empprojects>
  >(this.empprojects);

  freelancer = [
    {
      id: 1,
      image: 'assets/img/user/avatar-1.jpg',
      name: 'George Wells',
      role: 'UI/UX Designer',
      city: 'Alabama, USA',
      rating: '4.7 (32)',
      role2: 'Web Design',
      role3: 'UI Design',
      role4: 'Node Js',
      price: '25 Hourly',
      viewlancer: true,
      viewfree: false,
    },

    {
      id: 2,
      image: 'assets/img/user/avatar-2.jpg',
      name: 'Timothy Smith',
      role: 'PHP Developer',
      city: 'Illinois, USA',
      rating: '4.8 (55)',
      role2: 'Web Design',
      role3: 'Angular',
      role4: 'Node Js',
      price: '21 Hourly',
      viewlancer: true,
      viewfree: false,
    },
    {
      id: 3,
      image: 'assets/img/user/avatar-3.jpg',
      name: 'Janet Paden',
      role: 'Graphic Designer',
      city: 'New York, USA',
      rating: '4.1 (30)',
      role2: 'Web Design',
      role3: 'UI Design',
      role4: 'Node Js',
      price: 'Free',
      viewlancer: false,
      viewfree: true,
    },
    {
      id: 4,
      image: 'assets/img/user/avatar-4.jpg',
      name: 'James Douglas',
      role: 'iOS Developer',
      city: 'Florida, USA',
      rating: '3.2 (22)',
      role2: 'Web Design',
      role3: 'UI Design',
      role4: 'Node Js',
      price: 'Free',
      viewlancer: false,
      viewfree: true,
    },
    {
      id: 5,
      image: 'assets/img/user/avatar-5.jpg',
      name: 'Floyd Lewis',
      role: 'SEO Developer',
      city: 'Texas, USA',
      rating: '4.9 (40)',
      role2: 'Web Design',
      role3: 'UI Design',
      role4: 'Node Js',
      price: '30 Hourly',
      viewlancer: true,
      viewfree: false,
    },
    {
      id: 6,
      image: 'assets/img/user/avatar-6.jpg',
      name: 'Jacqueline Daye',
      role: 'SM Developer',
      city: 'California, USA',
      rating: '4.3 (35)',
      role2: 'Web Design',
      role3: 'UI Design',
      role4: 'Node Js',
      price: '12 Hourly',
      viewlancer: true,
      viewfree: false,
    },
    {
      id: 7,
      image: 'assets/img/user/avatar-7.jpg',
      name: 'Crystal Kemper',
      role: 'Network Engineer',
      city: 'Maryland, USA',
      rating: '3.5 (28)',
      role2: 'Web Design',
      role3: 'UI Design',
      role4: 'Node Js',
      price: '20 Hourly',
      viewlancer: true,
      viewfree: false,
    },
    {
      id: 8,
      image: 'assets/img/user/avatar-8.jpg',
      name: 'Tony Ingle',
      role: 'Business Analyst',
      city: 'Missouri, USA',
      rating: '2.1 (15)',
      role2: 'Web Design',
      role3: 'UI Design',
      role4: 'Node Js',
      price: 'Free',
      viewlancer: false,
      viewfree: true,
    },
    {
      id: 9,
      image: 'assets/img/user/avatar-9.jpg',
      name: 'Mickey Bernier',
      role: 'QA Engineer',
      city: 'Colorado, USA',
      rating: '5.0 (4)',
      role2: 'Web Design',
      role3: 'UI Design',
      role4: 'Node Js',
      price: 'Free',
      viewlancer: false,
      viewfree: true,
    },
    {
      id: 10,
      image: 'assets/img/user/avatar-10.jpg',
      name: 'Floyd Lewis',
      role: 'SEO Developer',
      city: 'Texas, USA',
      rating: '4.9 (40)',
      role2: 'Web Design',
      role3: 'UI Design',
      role4: 'Node Js',
      price: '30 Hourly',
      viewlancer: true,
      viewfree: false,
    },
    {
      id: 11,
      image: 'assets/img/user/avatar-8.jpg',
      name: 'Tony Ingle',
      role: 'Business Analyst',
      city: 'Missouri, USA',
      rating: '2.1 (15)',
      role2: 'Web Design',
      role3: 'UI Design',
      role4: 'Node Js',
      price: 'Free',
      viewlancer: false,
      viewfree: true,
    },
    {
      id: 12,
      image: 'assets/img/user/avatar-6.jpg',
      name: 'Jacqueline Daye',
      role: 'SM Developer',
      city: 'California, USA',
      rating: '4.3 (35)',
      role2: 'Web Design',
      role3: 'UI Design',
      role4: 'Node Js',
      price: '12 Hourly',
      viewlancer: true,
      viewfree: false,
    },
  ];
  public ManageUsers1: BehaviorSubject<Array<freelancerlist>> =
    new BehaviorSubject<Array<freelancerlist>>(this.freelancer);

  public freeprojects = [
    {
      id: 1,
      img: 'assets/img/company/img-1.png',
      company: 'AMAZE TECH',
      role: 'UI/UX Developer ',
      ago: 'Just Now',
      city: 'Georgia, USA',
      role2: 'After Effects',
      role3: 'Illustrator',
      role4: 'HTML',
      price: '20',
      price2: '500',
      days: '5',
      proposal: '30',
      type: 'Full Time',
    },
    {
      id: 2,
      img: 'assets/img/company/img-2.png',
      company: 'PARK INC',
      role: 'PHP Developer',
      ago: ' 1 min ago',
      city: 'California, USA',
      role2: 'Node Js',
      role3: 'Illustrator',
      role4: 'HTML',
      price: '90',
      price2: '450',
      days: '3',
      proposal: '35',
      type: 'Full Time',
    },
    {
      id: 3,
      img: 'assets/img/company/img-3.png',
      company: 'TECH ZONE',
      role: 'Graphic Designer',
      ago: ' 30 mins ago',
      city: 'New York, USA',
      role2: 'After Effects',
      role3: 'React Js',
      role4: 'HTML',
      price: '15',
      price2: '350',
      days: '5',
      proposal: '30',
      type: 'Part Time',
    },
    {
      id: 4,
      img: 'assets/img/company/img-4.png',
      company: 'ABC SOFTWARE ',
      role: 'iOS Developer',
      ago: ' 1 day ago',
      city: 'Florida, USA',
      role2: 'After Effects',
      role3: 'Illustrator',
      role4: 'HTML',
      price: '20',
      price2: '500',
      days: '5',
      proposal: '30',
      type: 'Full Time',
    },
    {
      id: 5,
      img: 'assets/img/company/img-5.png',
      company: 'HOST TECHNOLOGIES',
      role: 'SEO Developer',
      ago: '3 days ago',
      city: 'Texas, USA',
      role2: 'Angular',
      role3: 'PHP',
      role4: 'HTML',
      price: '50',
      price2: '150',
      days: '5',
      proposal: '20',
      type: 'Full Time',
    },
    {
      id: 6,
      img: 'assets/img/company/img-6.png',
      company: 'ALFRED TECH',
      role: 'SM Developer',
      ago: '1 week ago',
      city: 'Virginia, USA',
      role2: 'After Effects',
      role3: 'Illustrator',
      role4: 'HTML',
      price: '50',
      price2: '250',
      days: '3',
      proposal: '50',
      type: 'Full Time',
    },
    {
      id: 7,
      img: 'assets/img/company/img-7.png',
      company: 'KIND SOFTWARES ',
      role: 'Network Engineer',
      ago: '3 weeks ago',
      city: 'Delaware, USA',
      role2: 'Network',
      role3: 'Illustrator',
      role4: 'HTML',
      price: '12',
      price2: '320',
      days: '2',
      proposal: '50',
      type: 'Part Time',
    },
    {
      id: 8,
      img: 'assets/img/company/img-8.png',
      company: 'PARTICLES INC',
      role: 'Business Analyst',
      ago: ' 1 month ago',
      city: 'Kentucky, USA',
      role2: 'After Effects',
      role3: 'Illustrator',
      role4: 'HTML',
      price: '35',
      price2: '650',
      days: '1',
      proposal: '85',
      type: 'Full Time',
    },
    {
      id: 9,
      img: 'assets/img/company/img-9.png',
      company: 'ALFRED TECH',
      role: 'SM Developer',
      ago: '1 week ago',
      city: 'Virginia, USA',
      role2: 'After Effects',
      role3: 'Illustrator',
      role4: 'HTML',
      price: '50',
      price2: '250',
      days: '3',
      proposal: '50',
      type: 'Full Time',
    },
    {
      id: 10,
      img: 'assets/img/company/img-10.png',
      company: 'ABC SOFTWARE ',
      role: 'iOS Developer',
      ago: ' 1 day ago',
      city: 'Florida, USA',
      role2: 'After Effects',
      role3: 'Illustrator',
      role4: 'HTML',
      price: '20',
      price2: '500',
      days: '5',
      proposal: '30',
      type: 'Full Time',
    },
  ];
  public ManageUsers3: BehaviorSubject<Array<freeprojects>> =
    new BehaviorSubject<Array<freeprojects>>(this.freeprojects);

  public freelist = [
    {
      id: 1,
      name: 'John Doe',
      company: 'Dreamguystech',
      image: 'assets/img/developer/developer-01.jpg',
      content: '3D Renders and Amazon Product Store images/Video ',
      customer: 'client',
      amount: '599.00',
      date1: 'October 10,2021',
      level: 'FIXED',
      type: 'Hourly',
      money: '500.00',
      days: '12 Days',
      date: 'October 10,2021',
      review: '4',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. At diam sit erat et eros. Et cursus tellus viverra adipiscing suspendisse. Semper arcu est eget eleifend. Faucibus elit massa sollicitudin elementum ut feugiat nunc ac. Turpis quam sed in sed curabitur netus laoreet. In tortor neque sapien praesent porttitor cursus sed cum....',
    },
    {
      id: 2,
      name: 'Danie S.',
      company: 'Dreamguystech',
      image: 'assets/img/developer/developer-02.jpg',
      content: 'Landing Page Redesign / Sales Page Redesign (Not Entire Web)',
      customer: 'product',
      amount: '300.00',
      level: 'FIXED',
      date1: 'October 10,2021',
      type: 'Hourly',
      money: '200.00',
      days: '12 Days',
      date: 'October 10,2021',
      review: '4',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. At diam sit erat et eros. Et cursus tellus viverra adipiscing suspendisse. Semper arcu est eget eleifend. Faucibus elit massa sollicitudin elementum ut feugiat nunc ac. Turpis quam sed in sed curabitur netus laoreet. In tortor neque sapien praesent porttitor cursus sed cum....',
    },
    {
      id: 3,
      name: 'Thomas George',
      company: 'Dreamguystech',
      image: 'assets/img/developer/developer-03.jpg',
      content: 'WooCommerce Product Page Back Up Restoration',
      customer: 'client',
      amount: '200.00',
      date1: 'October 10,2021',
      level: 'FIXED',
      type: 'Hourly',
      money: '600.00',
      date: 'October 10,2021',
      review: '4',
      days: '12 Days',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. At diam sit erat et eros. Et cursus tellus viverra adipiscing suspendisse. Semper arcu est eget eleifend. Faucibus elit massa sollicitudin elementum ut feugiat nunc ac. Turpis quam sed in sed curabitur netus laoreet. In tortor neque sapien praesent porttitor cursus sed cum....',
    },
    {
      id: 4,
      name: 'John paul',
      company: 'Dreamguystech',
      image: 'assets/img/developer/developer-04.jpg',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      customer: 'client',
      amount: '600.00',
      date1: 'October 10,2021',
      level: 'FIXED',
      type: 'Days',
      money: '400.00',
      days: '18 Days',
      date: 'October 10,2021',
      review: '4',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. At diam sit erat et eros. Et cursus tellus viverra adipiscing suspendisse. Semper arcu est eget eleifend. Faucibus elit massa sollicitudin elementum ut feugiat nunc ac. Turpis quam sed in sed curabitur netus laoreet. In tortor neque sapien praesent porttitor cursus sed cum....',
    },
  ];
  public ManageUsers4: BehaviorSubject<Array<freelist>> = new BehaviorSubject<
    Array<freelist>
  >(this.freelist);

  public freecompleted = [
    {
      id: 1,
      name: 'John Paul',
      company: 'Dreamguystech',
      image: 'assets/img/developer/developer-04.jpg',
      content: 'PHP Laravel Developer Required (Contractual Employement)',
      amount: '500.00',
      level: 'FIXED',
      date: 'October 10,2021',
      review: '4',
    },
    {
      id: 2,
      name: 'Danie S.',
      company: 'Dreamguystech',
      image: 'assets/img/developer/developer-02.jpg',
      content: 'Landing Page Redesign / Sales Page Redesign (Not Entire Web)',
      amount: '300.00',
      level: 'FIXED',
      date: 'October 10,2021',
      review: '4',
    },
    {
      id: 3,
      name: 'Thomas George',
      company: 'Dreamguystech',
      image: 'assets/img/developer/developer-03.jpg',
      content: 'WooCommerce Product Page Back Up Restoration',
      amount: '200.00',
      level: 'FIXED',
      date: 'October 10,2021',
      review: '4',
    },
    {
      id: 4,
      name: 'John Doe',
      company: 'Dreamguystech',
      image: 'assets/img/developer/developer-01.jpg',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      amount: '600.00',
      level: 'FIXED',
      date: 'October 10,2021',
      review: '4',
    },
  ];
  public ManageUsers5: BehaviorSubject<Array<freecompleted>> =
    new BehaviorSubject<Array<freecompleted>>(this.freecompleted);

  public tasks = [
    {
      name: 'Create desktop applications',
      milestone: 'Research',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...',
      availability: 'Pending',
    },
    {
      name: 'Full-stack Developer	',
      milestone: 'Research',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...',
      availability: 'Completed',
    },
    {
      name: 'PHP, Javascript Projects',
      milestone: 'Research',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...',
      availability: 'Completed',
    },
    {
      name: 'Swift / SwiftUI Developer',
      milestone: 'Research',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...',
      availability: 'Completed',
    },
    {
      name: 'Website Designer Required',
      milestone: 'Research',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...',
      availability: 'Completed',
    },
    {
      name: 'Website Designer Required',
      milestone: 'Research',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...',
      availability: 'Pending',
    },
  ];

  public files = [
    {
      image: 'assets/img/icon/manage-file-icon-01.svg',
      title: 'Website Designer Required',
      para: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...	',
      type: 'Png',
      size: '20 KB',
    },
    {
      image: 'assets/img/icon/manage-file-icon-02.svg',
      title: 'Create desktop applications',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...',
      type: 'Jpg',
      size: '2 MB',
    },
    {
      image: 'assets/img/icon/manage-file-icon-04.svg',
      title: 'Website Designer Required',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...',
      type: 'Png',
      size: '25 KB',
    },
    {
      image: 'assets/img/icon/manage-file-icon-05.svg',
      title: 'Swift / SwiftUI Developer',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...',
      type: 'Jpg',
      size: '50 KB',
    },
    {
      image: 'assets/img/icon/manage-file-icon-06.svg',
      title: 'Full-stack Developer',
      para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...',
      type: 'Png',
      size: '38 KB',
    },
  ];
  payment = [
    {
      name: 'Research',
      price: '$2222',
      date: '29 Sep 2023',
      type: 'Milestone',
      status: 'Pending',
    },
    {
      name: 'Design',
      price: '$5762',
      date: '29 Sep 2023',
      type: 'Milestone',
      status: 'Completed',
    },
    {
      name: 'Development',
      price: '$4879',
      date: '29 Sep 2023',
      type: 'Milestone',
      status: 'Completed',
    },
  ];
  mile = [
    {
      name: 'Create desktop applications',
      price: '$5762',
      percentage: '50%',
      startdate: '25 Sep 2023 ',
      enddate: '25 Sep 2023',
      availability: 'Paid',
      full: 'Unpaid',
      action:'Initiate'
      
    },
    {
      name: 'Full-stack Developer',
      price: '$7853',
      percentage: '100%',
      startdate: '01 Sep 2023 ',
      enddate: '01 Sep 2023',
      availability: 'Paid',
      full: 'Pay now',
      action:'Initiate'
    },
    {
      name: 'Logo Design',
      price: '$2222',
      percentage: '45%',
      startdate: '29 Sep 2023 ',
      enddate: '29 Sep 2023',
      availability: 'Unpaid',
      full: 'Pay now',
      action:'Initiate'
    },
    {
      name: 'PHP, Javascript Projects',
      price: '$4879',
      percentage: '100%',
      startdate: '17 Sep 2023 ',
      enddate: '17 Sep 2023',
      availability: 'Paid',
      full: 'Pay now',
      action:'Initiate'
    },
    {
      name: 'Swift / SwiftUI Developer',
      price: '$2789',
      percentage: '100%',
      startdate: '05 Sep 2023 ',
      enddate: '05 Sep 2023',
      availability: 'Paid',
      full: 'Pay now',
      action:'Initiate'
    },
    {
      name: 'Website Designer Required',
      price: '$3651',
      percentage: '50%',
      startdate: '11 Sep 2023',
      enddate: '11 Sep 2023',
      availability: 'Paid',
      full: 'Pay now',
      action:'Initiate'
    },
  ];

  invoice = [
    {
      invoices: 'INV-5622',
      client: 'Amaze Tech',
      lastvisit: '20 Oct 2019',
      amount: '150',
      duedate: '22 Oct 2021',
      availability: 'Paid',
      paidon: 'Wed Nov 2 2019 09:41:48 GMT+0530 (India Standard Time)',
    },
    {
      invoices: 'INV-4545',
      client: 'Park Inc',
      lastvisit: '12 Sep 2021',
      amount: '50',
      duedate: '25 Oct 2021',
      availability: 'Partially Paid',
      paidon: '18 Oct 2021 10:21:48 GMT+0530 (India Standard Time)',
    },
    {
      invoices: 'INV-1582',
      client: 'Abc Software',
      lastvisit: '13 Sep 2021',
      amount: '180',
      duedate: '28 Oct 2021',
      availability: 'Paid',
      paidon: '13 Oct 2021 12:11:48 GMT+0530 (India Standard Time)',
    },
    {
      invoices: 'INV-2254',
      client: 'Host Technologies',
      lastvisit: '10 Sep 2021',
      amount: '60',
      duedate: '15 Oct 2021',
      availability: 'Paid',
      paidon: '10 Oct 2021, 07:11:48 GMT+0530 (India Standard Time)',
    },
    {
      invoices: 'INV-1526',
      client: 'Host Technologies',
      lastvisit: '12 Sep 2021',
      amount: '20',
      duedate: '29 Oct 2021',
      availability: 'Overdue',
      paidon: '29 Oct 2021 09:41:48 GMT+0530 (India Standard Time)',
    },
    {
      invoices: 'INV-1200',
      client: 'Alfred Tech',
      lastvisit: '05 Sep 2021',
      amount: '80',
      duedate: '15 Oct 2021',
      availability: 'Overdue',
      paidon: '10 Oct 2021 09:41:48 GMT+0530 (India Standard Time)',
    },
    {
      invoices: 'INV-1456',
      client: 'Kind Softwares',
      lastvisit: '10 Sep 2021',
      amount: '30',
      duedate: '15 Oct 2021',
      availability: 'Partially Paid',
      paidon: '13 Oct 2021 09:41:48 GMT+0530 (India Standard Time)',
    },
  ];

  public sideBar : header[] = [
    {
      tittle: 'Home',
      base: 'home',
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Home',
          route: routes.home,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'home',
          page: '',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'Home 2',
          route: routes.home2,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'home2',
          page: '',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'Home 3',
          route: routes.home3,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'home3',
          page: '',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'Home 4',
          route: routes.home4,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'home4',
          page: '',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'Home 5',
          route: routes.home5,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'home5',
          page: '',
          last: '',
          subMenus: [],
        },
      ],
    },
    {
      tittle: 'For Employers',
      base: 'employer',
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Freelancers',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'employer',
          last: '',
          subMenus: [
            {
              menuValue: 'Freelancers',
              route: routes.freelancer,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'employer',
              page: 'developer',
              last: '',
              subMenus: [],
            },
            {
              menuValue: 'Freelancers details',
              route: routes.freelancerdetail,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'freelancer',
              page: 'developers-details',
              last: '',
              subMenus: [],
            },
          ],
        },
        {
          menuValue: 'Dashboard',
          route: routes.employee_dashboard,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'employer',
          page: 'dashboard',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'My Profile',
          route: routes.employee_company_profile,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'employer',
          page: 'company-profile',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'Projects',
          route: routes.employee_all_projects,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'employer',
          page: 'all-projects',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'Favourites',
          route: routes.employee_markedfavourites,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'employer',
          page: 'markedfavourites',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'Membership',
          route: routes.employee_membership_plans,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'employer',
          page: 'membership-plans',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'Milestone',
          route: routes.employee_milestone,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'employer',
          page: 'milestones',
          last: 'milestone',
          subMenus: [],
        },
        {
          menuValue: 'Chats',
          route: routes.employee_chat,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'employer',
          page: 'chats',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'Review',
          route: routes.employee_review,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'employer',
          page: 'review',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'Payments',
          route: routes.employee_deposit_funds,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'employer',
          page: 'deposit-funds',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'Verify Identity',
          route: routes.employee_verify_identity,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'employer',
          page: 'verify-identity',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'Settings',
          route: routes.employee_basic_settings,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'employer',
          page: 'profile-settings',
          last: 'basic-settings',
          subMenus: [],
        },
      ],
    },
    {
      tittle: 'For Freelancer',
      base: 'freelancer',
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Projects',
          hasSubRoute: true,
          showSubRoute: false,
          page: 'project',
          last: '',
          subMenus: [
            {
              menuValue: 'Projects',
              route: routes.freelancer_project,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'employer',
              page: 'project',
              last: '',
              subMenus: [],
            },
            {
              menuValue: 'Projects details',
              route: routes.freelancer_project_details,
              hasSubRoute: false,
              showSubRoute: false,
              base: 'freelancer',
              page: 'project-details',
              last: '',
              subMenus: [],
            },
          ],
        },
        {
          menuValue: 'Dashboard',
          route: routes.freelancer_dashboard,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'freelancer',
          page: 'dashboards',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'My Profile',
          route: routes.freelancer_developer_profile,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'freelancer',
          page: 'developer-profile',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'Projects',
          route: routes.freelancer_projects_proposals,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'freelancer',
          page: 'projects-proposals',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'Favourites',
          route: routes.freelancer_favourite,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'freelancer',
          page: 'favourites',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'Membership',
          route: routes.freelancer_membership,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'freelancer',
          page: 'membership',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'Change Password',
          route: routes.freelancer_change_passwords,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'freelancer',
          page: 'change-passwords',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'Chats',
          route: routes.freelancer_message,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'freelancer',
          page: 'message',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'Review',
          route: routes.freelancer_review,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'freelancer',
          page: 'reviews',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'Portfolio',
          route: routes.freelancer_portfolio,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'freelancer',
          page: 'portfolio',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'Payments',
          route: routes.freelancer_withdraw_money,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'freelancer',
          page: 'withdraw-money',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'Verify Identity',
          route: routes.freelancer_verify_identity,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'freelancer',
          page: 'verify-identitys',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'Settings',
          route: routes.freelancer_profiles_settings,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'freelancer',
          page: 'profile-settings',
          last: '',
          subMenus: [],
        },
      ],
    },
    {
      tittle: 'Pages',
      base: 'pages',
      base1: 'auth',
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: 'About',
          route: routes.page_about,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'pages',
          page: 'about',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'Starter Page',
          route: routes.page_blank_page,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'pages',
          page: 'blank-page',
          last: '',
          subMenus: [],
        },
        {
          menuValue: '404 Page',
          route: routes.page_404,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'auth',
          page: '404-page',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'Login',
          route: routes.login,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'auth',
          page: 'login',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'Register',
          route: routes.register,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'auth',
          page: 'register',
          last: '',
          subMenus: [],
        }
         ,
        {
          menuValue: 'Onboard Screen',
          route: routes.freelancer_onboard,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'pages',
          page: 'onboard-screen',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'Forget Password',
          route: routes.forgot_password,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'auth',
          page: 'forget-password',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'Change Password',
          route: routes.changepasswords,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'auth',
          page: 'change-password',
          last: '',
          subMenus: [],
        },
      ],
    },
    {
      tittle: 'Blog',
      base: 'blog',
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Blog List',
          route: routes.blog_list,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'blog',
          page: 'list',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'Blog Grid',
          route: routes.blog_grid,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'blog',
          page: 'grid',
          last: '',
          subMenus: [],
        },
        {
          menuValue: 'Blog Details',
          route: routes.blog_details,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'blog',
          page: 'details',
          last: '',
          subMenus: [],
        },
      ],
    },
    {
      tittle: 'Admin',
      base: 'admin',
      showAsTab: false,
      separateRoute: true,
      route: routes.admin_login,
      menu: [],
    },
  ];
  public getSideBarData: BehaviorSubject<SideBarData[]> = new BehaviorSubject<
    SideBarData[]
  >(this.sideBar as unknown as SideBarData[]);
  public sidemenu = [
    {
      title: 'Dashboard',
      icon: 'assets/img/icon/sidebar-icon-01.svg',
      routes: routes.freelancer_dashboard,
    },
    {
      title: 'Projects',
      icon: 'assets/img/icon/sidebar-icon-02.svg',
      routes: routes.freelancer_dashboard,
      submenu: [
        { title: 'All Projects', routes: routes.freelancer_projects_proposals },
        {
          title: 'Ongoing Projects',
          routes: 'freelancer-ongoing-projects.html',
        },
        {
          title: 'Completed Projects',
          routes: 'freelancer-completed-projects.html',
        },
        {
          title: 'Pending Projects',
          routes: 'freelancer-cancelled-projects.html',
        },
        {
          title: 'Cancelled Projects',
          routes: 'freelancer-cancelled-projects.html',
        },
        {
          title: 'Expired Projects',
          routes: 'freelancer-cancelled-projects.html',
        },
      ],
    },
    {
      title: 'Favourites',
      icon: 'assets/img/icon/sidebar-icon-03.svg',
      routes: routes.freelancer_dashboard,
      submenu: [
        { title: 'Bookmarked Projects', routes: 'freelancer-favourites.html' },
        { title: 'Invitations', routes: 'freelancer-invitations.html' },
      ],
    },
    {
      title: 'Reviews',
      icon: 'assets/img/icon/sidebar-icon-04.svg',
      routes: routes.freelancer_dashboard,
    },

    {
      title: 'Chat',
      icon: 'assets/img/icon/sidebar-icon-06.svg',
      routes: routes.freelancer_dashboard,
    },

    {
      title: 'Payment',
      icon: 'assets/img/icon/sidebar-icon-09.svg',
      routes: routes.freelancer_dashboard,
    },
    {
      title: 'Settings',
      icon: 'assets/img/icon/sidebar-icon-10.svg',
      routes: 'javascript:void(0);',
      submenu: [
        { title: 'Profile Setting', routes: 'freelancer-favourites.html' },
        { title: 'Plan & Billing', routes: 'freelancer-invitations.html' },
        { title: 'Verify Identity', routes: 'freelancer-invitations.html' },
        { title: 'Changes Password', routes: 'freelancer-invitations.html' },
        { title: 'Delete Account', routes: 'freelancer-invitations.html' },
      ],
    },
    {
      title: 'Logout',
      icon: 'assets/img/icon/sidebar-icon-11.svg',
      routes: routes.freelancer_dashboard,
    },
  ];
  public getSidemenu: BehaviorSubject<SidemenuItem[]> = new BehaviorSubject<
    SidemenuItem[]
  >(this.sidemenu as unknown as SidemenuItem[]);

  public Admin_sideBar: AdminSidebar[] = [
    {
      tittle: 'Main',
      icon: 'home',
      showAsTab: false,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Dashboard',
          route: routes.admin_dashboard,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'icon-home',
          base: 'dashboard',
          subMenus: [],
        },
       /* {
          menuValue: 'Categories',
          route: routes.admin_categories,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'icon-copy',
          base: 'categories',
          subMenus: [],
        },
        {
          menuValue: 'Projects',
          route: routes.admin_projects,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'icon-database',
          base: 'projects',
          subMenus: [],
        },
        {
          menuValue: 'Freelancer',
          route: routes.admin_freelancers_all,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'icon-users',
          base: 'freelancers',
          subMenus: [],
        },
        {
          menuValue: 'Deposit',
          route: routes.admin_deposit_history,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'icon-user-check',
          base: 'deposit',
          subMenus: [],
        },
        {
          menuValue: 'Withdrawn',
          route: routes.admin_withdrawn_history,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'icon-user-check',
          base: 'withdrawn',
          subMenus: [],
        },
        {
          menuValue: 'Transaction',
          route: routes.admin_transaction_all,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'icon-clipboard',
          base: 'transaction',
          subMenus: [],
        },
        {
          menuValue: 'Providers',
          route: routes.admin_providers,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'icon-user-check',
          base: 'providers',
          subMenus: [],
        },
        {
          menuValue: 'Subscription',
          route: routes.admin_subscription_employer,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'icon-user-check',
          base: 'subscription',
          subMenus: [],
        },
        {
          menuValue: 'Reports',
          route: routes.admin_reports_projects,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'icon-pie-chart',
          base: 'reports',
          subMenus: [],
        },
        {
          menuValue: 'Roles',
          route: routes.admin_roles,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'icon-clipboard',
          base: 'roles',
          subMenus: [],
        },
        {
          menuValue: 'Skills',
          route: routes.admin_skills,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'icon-award',
          base: 'skills',
          subMenus: [],
        },*/
        {
          menuValue: 'Verifications',
          route: routes.admin_verifyidentity,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'icon-check-square',
          base: 'verifyidentity',
          subMenus: [],
        },
        {
          menuValue: 'Providers',
          route: routes.admin_providers,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'icon-user-check',
          base: 'providers',
          subMenus: [],
        },
        {
          menuValue: 'Companies',
          route: routes.admin_projects,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'icon-database',
          base: 'projects',
          subMenus: [],
        },
        /*{
          menuValue: 'Settings',
          route: routes.admin_settings_general,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'icon-user-check',
          base: 'settings',
          subMenus: [],
        },*/
      ],
    },
    
  ];
  public getAdminSideBarData: BehaviorSubject<Array<string>> =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new BehaviorSubject<Array<any>>(this.Admin_sideBar);

  public freelancer_sidebar : FreelancerSidebarItem[] = [
    {
      title: 'Dashboard',
      icon: 'assets/img/icon/sidebar-icon-01.svg',
      routes: routes.freelancer_dashboard,
      page: 'dashboards',
      hasSubRoute: false,
    },
    {
      title: 'Projects',
      icon: 'assets/img/icon/sidebar-icon-02.svg',
      routes: 'javascript:void(0);',
      hasSubRoute: true,
      page1: 'project-proposals',
      page2: 'ongoing-projects',
      page3: 'completed-projects',
      page4: 'cancelled-projects',
      submenu: [
        {
          title: 'My Proposal',
          routes: routes.freelancer_projects_proposals,
          page: 'project-proposals',
        },
        {
          title: 'Ongoing Projects',
          routes: routes.freelancerOngoingProjects,
          page: 'ongoing-projects',
        },
        {
          title: 'Completed Projects',
          routes: routes.completedProjects,
          page: 'completed-projects',
        },
        {
          title: 'Cancelled Projects',
          routes: routes.cancelledProjects,
          page: 'cancelled-projects',
        },
      ],
    },
    {
      title: 'Favourites',
      icon: 'assets/img/icon/sidebar-icon-03.svg',
      hasSubRoute: true,
      page1: 'favourites',
      page2: 'invitations',
      submenu: [
        {
          title: 'Bookmarked Projects',
          routes: routes.freelancer_favourite,
          page: 'favourites',
        },
        {
          title: 'Invitations',
          routes: routes.freelancer_invitations,
          page: 'invitations',
        },
      ],
    },
    {
      title: 'Reviews',
      hasSubRoute: false,
      icon: 'assets/img/icon/sidebar-icon-04.svg',
      routes: routes.freelancer_review,
      page: 'reviews',
    },
    {
      title: 'Portfolio',
      hasSubRoute: false,
      icon: 'assets/img/icon/sidebar-icon-05.svg',
      routes: routes.freelancer_portfolio,
      page: 'portfolio',
    },
    {
      title: 'Chat',
      hasSubRoute: false,
      icon: 'assets/img/icon/sidebar-icon-06.svg',
      routes: routes.freelancer_message,
      page: 'chats',
    },
    {
      title: 'Payments',
      hasSubRoute: false,
      icon: 'assets/img/icon/sidebar-icon-07.svg',
      routes: routes.freelancer_withdraw_money,
      page: 'withdraw-money',
    },
    {
      title: 'Payout',
      hasSubRoute: false,
      icon: 'assets/img/icon/sidebar-icon-08.svg',
      routes: routes.freelancer_payout,
      page: 'payout',
    },
    {
      title: 'Statement',
      hasSubRoute: false,
      icon: 'assets/img/icon/sidebar-icon-09.svg',
      routes: routes.freelancer_statement,
      page: 'statement',
    },
    {
      title: 'Settings',
      hasSubRoute: true,
      icon: 'assets/img/icon/sidebar-icon-10.svg',
      page1: 'profile-settings',
      page2: 'membership',
      page3: 'verify-identity',
      page4: 'change-password',
      page5: 'delete-account',
      submenu: [
        {
          title: 'Profile Setting',
          routes: routes.freelancer_profiles_settings,
          page: 'profile-settings',
        },
        {
          title: 'Plan & Billing',
          routes: routes.freelancer_membership,
          page: 'membership',
        },
        {
          title: 'Verify Identity',
          routes: routes.freelancer_verify_identity,
          page: 'verify-identity',
        },
        {
          title: 'Changes Password',
          routes: routes.freelancer_change_passwords,
          page: 'change-password',
        },
        {
          title: 'Delete Account',
          routes: routes.freelancer_delete_account,
          page: 'delete-account',
        },
      ],
    },
    {
      title: 'Logout',
      hasSubRoute: false,
      icon: 'assets/img/icon/sidebar-icon-11.svg',
      routes: routes.home,
    },
  ];
  public menuItem = [
    {
      title: 'Dashboard',
      icon: 'assets/img/icon/sidebar-icon-01.svg',
      routes: routes.employee_dashboard,
      page: 'dashboard',
      hasSubRoute: false,
    },
    {
      title: 'Projects',
      icon: 'assets/img/icon/sidebar-icon-02.svg',
      routes: 'javascript:void(0);',
      hasSubRoute: true,
      page1: 'all-projects',
      page2: 'ongoing-projects',
      page3: 'completed-projects',
      page4: 'pending-projects',
      page5: 'expired-project',
      page6:'cancelled-projects',
      
      submenu: [
        { title: 'All Projects', routes: routes.employee_all_projects,page:'all-projects' },
        {
          title: 'Ongoing Projects',
          routes: routes.ongoingproject,
          page: 'ongoing-projects'
        },
        {
          title: 'Completed Projects',
          routes: routes.completedproject,
          page: 'completed-projects'
        },
        {
          title: 'Pending Projects',
          routes: routes.pendingproject,
          page:'pending-projects'
        },
        {
          title: 'Cancelled Projects',
          routes: routes.cancelledproject,
          page:'cancelled-projects'
        },
        {
          title: 'Expired Projects',
          routes: routes.expiredproject,
          page:'expired-project'
        },
      ],
    },
    {
      title: 'Favourites',
      icon: 'assets/img/icon/sidebar-icon-03.svg',
      routes: 'javascript:void(0);',
      hasSubRoute: true,
      page1:'markedfavourites',
      page2:'invitedfavourites',
      submenu: [
        {
          title: 'Bookmarked Projects',
          routes: routes.employee_markedfavourites,
          page: 'markedfavourites',
        },
        { title: 'Invitations', routes: routes.employee_invitedfavourites , page: 'invitedfavourites',},
      ],
    },
    {
      title: 'Reviews',
      icon: 'assets/img/icon/sidebar-icon-04.svg',
      routes: routes.employee_review,
      hasSubRoute: false,
      page: 'review',
    },
    {
      title: 'Chat',
      icon: 'assets/img/icon/sidebar-icon-06.svg',
      routes: routes.employee_chat,
      hasSubRoute: false,
      page: 'chat',
    },
    {
      title: 'Payments',
      icon: 'assets/img/icon/sidebar-icon-07.svg',
      routes: routes.employee_deposit_funds,
      hasSubRoute: false,
      page: 'deposit-funds'
    },
    {
      title: 'Settings',
      icon: 'assets/img/icon/sidebar-icon-10.svg',
      routes: 'javascript:void(0);',
      hasSubRoute: true,
      page1: 'basic-settings' ,page2:'membership-plans',page3:'verify-identity',page4:'change-password',page5:'delete-account',
      submenu: [
        { title: 'Profile', routes: routes.employee_basic_settings,page:'basic-settings' },
        { title: 'Plan & Billing', routes: routes.employee_membership_plans ,page:'membership-plans'},
        { title: 'Verify Identity', routes: routes.employee_verify_identity,page: 'verify-identity' },
        { title: 'Changes Password', routes: routes.changepassword ,page: 'change-password'},
        { title: 'Delete Account', routes: routes.deleteaccount ,page:'delete-account'},
      ],
    },
    {
      title: 'Logout',
      icon: 'assets/img/icon/sidebar-icon-11.svg',
      routes: routes.freelancer_dashboard,
      hasSubRoute: false,
    },
  ];
}
