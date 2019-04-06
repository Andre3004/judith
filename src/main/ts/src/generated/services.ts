import { Inject, Injectable } from '@angular/core';
import { BROKER_CONFIGURATION, BrokerConfiguration, dwrWrapper } from './services-wrapper';
import { Observable } from 'rxjs';
import { Terceiro, Lancamento, Usuario, SituacaoLancamento, SortOrder, Page, Conta, TipoConta, Periodo, Endereco, TipoLancamento, TipoPessoa, PageRequest, SortDirection, Pageable, Banco, Categoria, NullHandling, Sort, FormaPagamento } from './entities';


@Injectable()
export class ContaService {
    constructor(@Inject(BROKER_CONFIGURATION) private brokerConfiguration: BrokerConfiguration) { }

        public insertConta(arg0?: Conta): Observable<Conta> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'insertConta', arg0) as Observable<Conta>;
    }

    public updateConta(arg0?: Conta): Observable<Conta> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'updateConta', arg0) as Observable<Conta>;
    }

    public deleteConta(arg0?: number): Observable<void> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'deleteConta', arg0) as Observable<void>;
    }

    public findContaById(arg0?: number): Observable<Conta> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'findContaById', arg0) as Observable<Conta>;
    }

    public listAllBancos(): Observable<Banco[]> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'listAllBancos') as Observable<Banco[]>;
    }

    public listAllContas(): Observable<Conta[]> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'listAllContas') as Observable<Conta[]>;
    }


}




@Injectable()
export class UsuarioService {
    constructor(@Inject(BROKER_CONFIGURATION) private brokerConfiguration: BrokerConfiguration) { }

        public deleteUsuario(arg0?: number): Observable<void> {
        return dwrWrapper(this.brokerConfiguration, 'usuarioService', 'deleteUsuario', arg0) as Observable<void>;
    }

    public insertUsuario(arg0?: Usuario): Observable<Usuario> {
        return dwrWrapper(this.brokerConfiguration, 'usuarioService', 'insertUsuario', arg0) as Observable<Usuario>;
    }

    public updateUsuario(arg0?: Usuario): Observable<Usuario> {
        return dwrWrapper(this.brokerConfiguration, 'usuarioService', 'updateUsuario', arg0) as Observable<Usuario>;
    }

    public findUsuarioById(arg0?: number): Observable<Usuario> {
        return dwrWrapper(this.brokerConfiguration, 'usuarioService', 'findUsuarioById', arg0) as Observable<Usuario>;
    }


}




@Injectable()
export class LancamentoService {
    constructor(@Inject(BROKER_CONFIGURATION) private brokerConfiguration: BrokerConfiguration) { }

        public listAllCategorias(): Observable<Categoria[]> {
        return dwrWrapper(this.brokerConfiguration, 'lancamentoService', 'listAllCategorias') as Observable<Categoria[]>;
    }

    public findCategoriaById(arg0?: number): Observable<Categoria> {
        return dwrWrapper(this.brokerConfiguration, 'lancamentoService', 'findCategoriaById', arg0) as Observable<Categoria>;
    }

    public insertAndRemoveAllCategorias(arg0?: Categoria[], arg1?: number[], arg2?: number[]): Observable<void> {
        return dwrWrapper(this.brokerConfiguration, 'lancamentoService', 'insertAndRemoveAllCategorias', arg0, arg1, arg2) as Observable<void>;
    }

    public deleteCategoria(arg0?: number): Observable<void> {
        return dwrWrapper(this.brokerConfiguration, 'lancamentoService', 'deleteCategoria', arg0) as Observable<void>;
    }

    public insertCategoria(arg0?: Categoria): Observable<Categoria> {
        return dwrWrapper(this.brokerConfiguration, 'lancamentoService', 'insertCategoria', arg0) as Observable<Categoria>;
    }

    public updateCategoria(arg0?: Categoria): Observable<Categoria> {
        return dwrWrapper(this.brokerConfiguration, 'lancamentoService', 'updateCategoria', arg0) as Observable<Categoria>;
    }


}



