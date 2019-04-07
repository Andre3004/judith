import { OpenSnackBarService } from './../../open-snackbar/open-snackbar.service';
import { LancamentoService } from './../../../generated/services';
import { Categoria } from './../../../generated/entities';
import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.scss']
})
export class CategoriaFormComponent implements OnInit
{
  

  public categorias: any[] = [];

  public categoriasRemovedIds: any[] =  [];

  public subCategoriasRemovedIds: any[] =  [];

  constructor(private lancamentoService: LancamentoService,
    public openSnackBarService: OpenSnackBarService,
    private router: Router)
  {
   

  }


  ngOnInit()
  {
    this.listAllCategorias();
  }

  public removeSubCategoria(categoria, i)
  {
    if(categoria.subCategorias[i].id)
      this.subCategoriasRemovedIds.push(categoria.subCategorias[i].id);
    categoria.subCategorias.splice(i, 1);
  }

  public removeCategoria(i)
  {
    if(this.categorias[i].id)
    {
      if(this.categorias[i].subCategorias && this.categorias[i].subCategorias.length > 0)
        this.openSnackBarService.open("Não é possível excluir uma categoria que possua Sub categorias.")
      else
      {
        this.categoriasRemovedIds.push(this.categorias[i].id);
        this.categorias.splice(i, 1);
      }
    }
    else
      this.categorias.splice(i, 1);
  }

  public addSubCategoria(categoria)
  {
    categoria.subCategorias.push({nome: "", categoriaPai: categoria});
  }

  public addCategoria()
  {
    this.categorias.push({nome: "", subCategorias: []})
  }


  public saveCategoria()
  {
    this.lancamentoService.insertAndRemoveAllCategorias(this.categorias, this.categoriasRemovedIds, this.subCategoriasRemovedIds).subscribe( result => {
      this.openSnackBarService.open("Categoria salvas com sucesso!");
      this.router.navigate(['/dashboard']);
      this.listAllCategorias();
    }, err => {
      this.openSnackBarService.open(err.message);
    })
    // if(error)
    // {
    //   this.openSnackBarService.open("Categoria salvas com sucesso!");
    //   this.router.navigate(['/dashboard']);
    // }
    // else
    // {
    //   this.router.navigate(['/dashboard']);
    // }

  }

  public listAllCategorias(): any
  {
    this.lancamentoService.listAllCategorias().subscribe( categorias => {
      this.categorias = categorias;
    }, err => console.log(err.message))
  }


}
