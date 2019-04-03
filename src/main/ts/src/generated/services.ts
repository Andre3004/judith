import { Inject, Injectable } from '@angular/core';
import { BROKER_CONFIGURATION, BrokerConfiguration, dwrWrapper } from './services-wrapper';
import { Observable } from 'rxjs';
import { Terceiro, Lancamento, Usuario, SituacaoLancamento, SortOrder, Page, Conta, TipoConta, Periodo, Endereco, TipoLancamento, TipoPessoa, PageRequest, SortDirection, Pageable, Categoria, Banco, NullHandling, Sort, FormaPagamento } from './entities';


@Injectable()
export class ContaService {
    constructor(@Inject(BROKER_CONFIGURATION) private brokerConfiguration: BrokerConfiguration) { }

        public findContaById(arg0?: number): Observable<Conta> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'findContaById', arg0) as Observable<Conta>;
    }

    public updateConta(arg0?: Conta): Observable<Conta> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'updateConta', arg0) as Observable<Conta>;
    }

    public deleteConta(arg0?: number): Observable<void> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'deleteConta', arg0) as Observable<void>;
    }

    public insertConta(arg0?: Conta): Observable<Conta> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'insertConta', arg0) as Observable<Conta>;
    }

    public listAllContas(): Observable<Conta[]> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'listAllContas') as Observable<Conta[]>;
    }

    public listAllBancos(): Observable<Banco[]> {
        return dwrWrapper(this.brokerConfiguration, 'contaService', 'listAllBancos') as Observable<Banco[]>;
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



