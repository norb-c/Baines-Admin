import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/service/users/users.service';
import { ActivatedRoute } from "@angular/router";
import { Constant } from 'src/app/utils/constant';
import { BorrowersService } from 'src/app/service/borrowers/borrowers.service';
import { SaversService } from 'src/app/service/savers/savers.service';
import {Location} from '@angular/common';
import { LoanPurposePipe } from 'src/app/filterPipes/byLoanPurpose/loan-purpose-pipe.pipe';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  providers: [LoanPurposePipe]
})
export class UserDetailsComponent implements OnInit {

  id: any;
  userDetails: any;
  userSavings: any;

  borrowerLoans: any;
  loan_details: any;
  tenor_type: any;
  loan_profile: any;
  moreProfile: any;
  totalSavings: any;
  banks: any;
  cards: any;
  term: any;
  config: any;

  constructor(private userService: UsersService,
    private borrowersService: BorrowersService,
    private saverService: SaversService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private location: Location
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
    });


    this.userService.getUser(this.id).subscribe((res: any) => {
      if (res.status === Constant.SUCCESS) {
        this.userDetails = res.data.user;
        this.moreProfile = res.data.loan_profile;
      }
      console.log(res.data);
    }, (err) => {
      if(err.status === 401){
        this.authService.logout();
      }
    });


    this.borrowersService.getLoans(this.id).subscribe((res: any) => {
      if(res.status === Constant.SUCCESS) {
        this.borrowerLoans = res.data;
        this.loan_details = res.data.loans;
        this.tenor_type = res.data.loans.tenor_type;
        this.loan_profile = res.data.loans.loan_profile;
      }
      console.log(res.data);
    });

    this.saverService.getUserSavings(this.id).subscribe((res: any) => {
      if(res.status === Constant.SUCCESS) {
        this.userSavings = res.data.plans;
        this.totalSavings = res.data.total_balance;
      }
      console.log(res.data);
    });


    this.userService.getUserBankingInfo(this.id).subscribe((res: any) => {
      if(res.status === Constant.SUCCESS) {
        this.banks = res.data.banks;
        this.cards = res.data.cards;
      }
    });



  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  back(){
    this.location.back();
  }  

}
