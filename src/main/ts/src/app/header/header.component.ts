import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef, Renderer, AfterViewInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingMode } from '@covalent/core';
import { LoadingType } from '@covalent/core';
import { TdLoadingService } from '@covalent/core';
import { OpenSnackBarService } from '../open-snackbar/open-snackbar.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit
{
  /*-------------------------------------------------------------------
  *                           ATRIBUTES
  *-------------------------------------------------------------------*/
 

  /*-------------------------------------------------------------------
  *                           CONSTRUCTOR
  *-------------------------------------------------------------------*/
  /**
   * 
   * @param pessoaService 
   */
  constructor(public activatedRoute: ActivatedRoute,
    public detectionRef: ChangeDetectorRef,
    private matDialog: MatDialog,
    private openSnackBarService: OpenSnackBarService,
    private router: Router,
    private tdLoadingService: TdLoadingService,)
  {
    

  }
  /*-------------------------------------------------------------------
  *                           BEHAVIORS
  *-------------------------------------------------------------------*/
  ngOnInit()
  {


  }


  /**
   * 
   */
  ngOnDestroy()
  {
   
  }

 
}
