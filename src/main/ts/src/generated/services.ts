import { Inject, Injectable } from '@angular/core';
import { BROKER_CONFIGURATION, BrokerConfiguration, dwrWrapper } from './services-wrapper';
import { Observable } from 'rxjs';
import { Terceiro, Lancamento, Usuario, SituacaoLancamento, SortOrder, Page, Conta, TipoConta, Periodo, Endereco, TipoLancamento, TipoPessoa, PageRequest, SortDirection, Pageable, Banco, Categoria, NullHandling, Sort, FormaPagamento } from './entities';


@Injectable()
<<<<<<< refs/remotes/origin/dev
export class UsuarioService {
    constructor(@Inject(BROKER_CONFIGURATION) private brokerConfiguration: BrokerConfiguration) { }

        public findUsuarioById(arg0?: number): Observable<Usuario> {
        return dwrWrapper(this.brokerConfiguration, 'usuarioService', 'findUsuarioById', arg0) as Observable<Usuario>;
    }

    public updateUsuario(arg0?: Usuario): Observable<Usuario> {
        return dwrWrapper(this.brokerConfiguration, 'usuarioService', 'updateUsuario', arg0) as Observable<Usuario>;
=======
export class LancamentoService {
    constructor(@Inject(BROKER_CONFIGURATION) private brokerConfiguration: BrokerConfiguration) { }

        public insertCategoria(arg0?: Categoria): Observable<Categoria> {
        return dwrWrapper(this.brokerConfiguration, 'lancamentoService', 'insertCategoria', arg0) as Observable<Categoria>;
    }

    public updateCategoria(arg0?: Categoria): Observable<Categoria> {
        return dwrWrapper(this.brokerConfiguration, 'lancamentoService', 'updateCategoria', arg0) as Observable<Categoria>;
    }

    public deleteCategoria(arg0?: number): Observable<void> {
        return dwrWrapper(this.brokerConfiguration, 'lancamentoService', 'deleteCategoria', arg0) as Observable<void>;
    }

    public findCategoriaById(arg0?: number): Observable<Categoria> {
        return dwrWrapper(this.brokerConfiguration, 'lancamentoService', 'findCategoriaById', arg0) as Observable<Categoria>;
    }

    public insertAndRemoveAllCategorias(arg0?: Categoria[], arg1?: number[]): Observable<void> {
        return dwrWrapper(this.brokerConfiguration, 'lancamentoService', 'insertAndRemoveAllCategorias', arg0, arg1) as Observable<void>;
    }

    public listAllCategorias(): Observable<Categoria[]> {
        return dwrWrapper(this.brokerConfiguration, 'lancamentoService', 'listAllCategorias') as Observable<Categoria[]>;
    }


}




@Injectable()
export class ContaService {
    constructor(@Inject(BROKER_CONFIGURATION) private brokerConfiguration: BrokerConfiguration) { }

        public deleteConta(arg0?: number): Observable<void> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'deleteConta', arg0) as Observable<void>;
    }

    public findContaById(arg0?: number): Observable<Conta> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'findContaById', arg0) as Observable<Conta>;
>>>>>>> Categorias
    }

    public insertUsuario(arg0?: Usuario): Observable<Usuario> {
        return dwrWrapper(this.brokerConfiguration, 'usuarioService', 'insertUsuario', arg0) as Observable<Usuario>;
    }

<<<<<<< refs/remotes/origin/dev
    public deleteUsuario(arg0?: number): Observable<void> {
        return dwrWrapper(this.brokerConfiguration, 'usuarioService', 'deleteUsuario', arg0) as Observable<void>;
=======
    public updateConta(arg0?: Conta): Observable<Conta> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'updateConta', arg0) as Observable<Conta>;
    }

    public insertConta(arg0?: Conta): Observable<Conta> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'insertConta', arg0) as Observable<Conta>;
    }

    public listAllBancos(): Observable<Banco[]> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'listAllBancos') as Observable<Banco[]>;
>>>>>>> Categorias
    }


}




@Injectable()
export class ContaService {
    constructor(@Inject(BROKER_CONFIGURATION) private brokerConfiguration: BrokerConfiguration) { }

<<<<<<< refs/remotes/origin/dev
        public findContaById(arg0?: number): Observable<Conta> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'findContaById', arg0) as Observable<Conta>;
=======
        public updateUsuario(arg0?: Usuario): Observable<Usuario> {
        return dwrWrapper(this.brokerConfiguration, 'usuarioService', 'updateUsuario', arg0) as Observable<Usuario>;
>>>>>>> Categorias
    }

    public updateConta(arg0?: Conta): Observable<Conta> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'updateConta', arg0) as Observable<Conta>;
    }

<<<<<<< refs/remotes/origin/dev
    public listAllContas(): Observable<Conta[]> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'listAllContas') as Observable<Conta[]>;
=======
    public deleteUsuario(arg0?: number): Observable<void> {
        return dwrWrapper(this.brokerConfiguration, 'usuarioService', 'deleteUsuario', arg0) as Observable<void>;
>>>>>>> Categorias
    }

    public insertConta(arg0?: Conta): Observable<Conta> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'insertConta', arg0) as Observable<Conta>;
    }

    public deleteConta(arg0?: number): Observable<void> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'deleteConta', arg0) as Observable<void>;
    }

    public listAllBancos(): Observable<Banco[]> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'listAllBancos') as Observable<Banco[]>;
    }


}



