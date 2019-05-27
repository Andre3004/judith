import { Inject, Injectable } from '@angular/core';
import { BROKER_CONFIGURATION, BrokerConfiguration, dwrWrapper } from './services-wrapper';
import { Observable } from 'rxjs';
import { Terceiro, Lancamento, SituacaoLancamento, Usuario, SortOrder, Page, Conta, TipoConta, Periodo, Endereco, TipoLancamento, PageRequest, SortDirection, Pageable, Categoria, Banco, NullHandling, Sort, FormaPagamento } from './entities';


@Injectable()
export class TerceiroService {
    constructor(@Inject(BROKER_CONFIGURATION) private brokerConfiguration: BrokerConfiguration) { }

        public updateTerceiro(arg0?: Terceiro): Observable<Terceiro> {
        return dwrWrapper(this.brokerConfiguration, 'terceiroService', 'updateTerceiro', arg0) as Observable<Terceiro>;
    }

    public findByIf(arg0?: number): Observable<Terceiro> {
        return dwrWrapper(this.brokerConfiguration, 'terceiroService', 'findByIf', arg0) as Observable<Terceiro>;
    }

    public deleteTerceiro(arg0?: number): Observable<void> {
        return dwrWrapper(this.brokerConfiguration, 'terceiroService', 'deleteTerceiro', arg0) as Observable<void>;
    }

    public insertTerceiro(arg0?: Terceiro): Observable<Terceiro> {
        return dwrWrapper(this.brokerConfiguration, 'terceiroService', 'insertTerceiro', arg0) as Observable<Terceiro>;
    }


}




@Injectable()
export class ContaService {
    constructor(@Inject(BROKER_CONFIGURATION) private brokerConfiguration: BrokerConfiguration) { }

        public findContaById(arg0?: number): Observable<Conta> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'findContaById', arg0) as Observable<Conta>;
    }

    public listAllBancos(): Observable<Banco[]> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'listAllBancos') as Observable<Banco[]>;
    }

    public disableConta(arg0?: number, arg1?: Boolean): Observable<Conta> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'disableConta', arg0, arg1) as Observable<Conta>;
    }

    public listAllContas(): Observable<Conta[]> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'listAllContas') as Observable<Conta[]>;
    }

    public insertConta(arg0?: Conta): Observable<Conta> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'insertConta', arg0) as Observable<Conta>;
    }

    public updateConta(arg0?: Conta): Observable<Conta> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'updateConta', arg0) as Observable<Conta>;
    }

    public deleteConta(arg0?: number): Observable<void> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'deleteConta', arg0) as Observable<void>;
    }


}




@Injectable()
export class UsuarioService {
    constructor(@Inject(BROKER_CONFIGURATION) private brokerConfiguration: BrokerConfiguration) { }

        public deleteUsuario(arg0?: number): Observable<void> {
        return dwrWrapper(this.brokerConfiguration, 'usuarioService', 'deleteUsuario', arg0) as Observable<void>;
    }

    public findUsuarioById(arg0?: number): Observable<Usuario> {
        return dwrWrapper(this.brokerConfiguration, 'usuarioService', 'findUsuarioById', arg0) as Observable<Usuario>;
    }

    public updateUsuario(arg0?: Usuario): Observable<Usuario> {
        return dwrWrapper(this.brokerConfiguration, 'usuarioService', 'updateUsuario', arg0) as Observable<Usuario>;
    }

    public insertUsuario(arg0?: Usuario): Observable<Usuario> {
        return dwrWrapper(this.brokerConfiguration, 'usuarioService', 'insertUsuario', arg0) as Observable<Usuario>;
    }


}




@Injectable()
export class LancamentoService {
    constructor(@Inject(BROKER_CONFIGURATION) private brokerConfiguration: BrokerConfiguration) { }

        public listAllCategorias(): Observable<Categoria[]> {
        return dwrWrapper(this.brokerConfiguration, 'lancamentoService', 'listAllCategorias') as Observable<Categoria[]>;
    }

    public findLancamentoById(arg0?: number): Observable<Lancamento> {
        return dwrWrapper(this.brokerConfiguration, 'lancamentoService', 'findLancamentoById', arg0) as Observable<Lancamento>;
    }

    public listLancamentoProximosAvencer(arg0?: number): Observable<Lancamento[]> {
        return dwrWrapper(this.brokerConfiguration, 'lancamentoService', 'listLancamentoProximosAvencer', arg0) as Observable<Lancamento[]>;
    }

    public insertAndRemoveAllCategorias(arg0?: Categoria[], arg1?: number[], arg2?: number[]): Observable<void> {
        return dwrWrapper(this.brokerConfiguration, 'lancamentoService', 'insertAndRemoveAllCategorias', arg0, arg1, arg2) as Observable<void>;
    }

    public findLancamentoByContaDestinoId(arg0?: number): Observable<Lancamento[]> {
        return dwrWrapper(this.brokerConfiguration, 'lancamentoService', 'findLancamentoByContaDestinoId', arg0) as Observable<Lancamento[]>;
    }

    public listLancamentoByFilters(arg0?: string, arg1?: TipoLancamento, arg2?: number, arg3?: Date, arg4?: Date): Observable<Lancamento[]> {
        return dwrWrapper(this.brokerConfiguration, 'lancamentoService', 'listLancamentoByFilters', arg0, arg1, arg2, arg3, arg4) as Observable<Lancamento[]>;
    }

    public listAllTerceiros(): Observable<Terceiro[]> {
        return dwrWrapper(this.brokerConfiguration, 'lancamentoService', 'listAllTerceiros') as Observable<Terceiro[]>;
    }

    public insertLancamento(arg0?: Lancamento, arg1?: number[]): Observable<Lancamento> {
        return dwrWrapper(this.brokerConfiguration, 'lancamentoService', 'insertLancamento', arg0, arg1) as Observable<Lancamento>;
    }

    public updateLancamento(arg0?: Lancamento): Observable<Lancamento> {
        return dwrWrapper(this.brokerConfiguration, 'lancamentoService', 'updateLancamento', arg0) as Observable<Lancamento>;
    }

    public deleteLancamento(arg0?: number): Observable<void> {
        return dwrWrapper(this.brokerConfiguration, 'lancamentoService', 'deleteLancamento', arg0) as Observable<void>;
    }

    public listLancamentosPendentesToNotificacao(): Observable<Lancamento[]> {
        return dwrWrapper(this.brokerConfiguration, 'lancamentoService', 'listLancamentosPendentesToNotificacao') as Observable<Lancamento[]>;
    }


}



