import { ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef, Renderer, AfterViewInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingMode } from '@covalent/core';
import { LoadingType } from '@covalent/core';
import { TdLoadingService } from '@covalent/core';
import { OpenSnackBarService } from '../open-snackbar/open-snackbar.service';
import { LancamentoService } from 'src/generated/services';

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
 
  public menus : any[] = [
    {title: "Dashboard", icon: 'dashboard', router: 'dashboard'},
    {title: "Categorias", icon: 'bookmark', router: 'categorias'},
    {title: "Lançamentos", icon: 'attach_money', router: 'lancamentos'},
    {title: "Terceiros", icon: 'account_circle', router: 'terceiros'}
  ]

  public lancamentosPendentes = [];

  public view = false;
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
    private tdLoadingService: TdLoadingService,
    private lancamentoService: LancamentoService,
    private _router: Router)
  {
    

  }
  /*-------------------------------------------------------------------
  *                           BEHAVIORS
  *-------------------------------------------------------------------*/
  ngOnInit()
  {
    this.onListNotificacoes();

  }


  onListNotificacoes()
  {
      this.lancamentoService.listLancamentosPendentesToNotificacao().subscribe( result => {
        this.lancamentosPendentes = result;
      }, err => console.log(`error`, err))
  }

  goToLancamento(lancamentoPendente){
    this._router.navigate(['lancamentos/', lancamentoPendente.tipo, lancamentoPendente.id]);
  }
  /**
   * 
   */
  ngOnDestroy()
  {
   
  }

 
}
