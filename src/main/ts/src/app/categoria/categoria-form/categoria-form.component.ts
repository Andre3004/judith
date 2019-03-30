import { Categoria } from './../../../generated/entities';
import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.scss']
})
export class CategoriaFormComponent implements OnInit
{

  public categorias: any[] = [];

  constructor()
  {

    let categoria1: any = {
      nome: "Categoria 1",
      subCategorias: [
        { nome: "Sub Categoria 1", categoriaPai: null },
        { nome: "Sub Categoria 1", categoriaPai: null },
      ]

    }

    let categoria2: any = {
      nome: "Categoria 2",
      subCategorias: [
        { nome: "Sub Categoria 2", categoriaPai: null },
        { nome: "Sub Categoria 2", categoriaPai: null },
      ]
    }

    this.categorias.push(categoria1);
    this.categorias.push(categoria2);

  }


  ngOnInit()
  {
  }

  public removeSubCategoria(categoria, i)
  {
    categoria.subCategorias.splice(i, 1);
  }

  public removeCategoria(i)
  {
    this.categorias.splice(i, 1);
  }

  public addSubCategoria(categoria)
  {
    categoria.subCategorias.push({nome: "Sub Categoria 3"});
  }

  public addCategoria()
  {
    this.categorias.push({nome: "Categoria 3", subCategorias: []})
  }


}
