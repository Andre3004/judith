import { Inject, Injectable } from '@angular/core';
import { BROKER_CONFIGURATION, BrokerConfiguration, dwrWrapper } from './services-wrapper';
import { Observable } from 'rxjs';
import { Terceiro, Lancamento, SituacaoLancamento, Usuario, SortOrder, Page, Conta, TipoConta, Periodo, Endereco, TipoLancamento, TipoPessoa, PageRequest, SortDirection, Pageable, Categoria, NullHandling, Sort, FormaPagamento } from './entities';


@Injectable()
export class UsuarioService {
    constructor(@Inject(BROKER_CONFIGURATION) private brokerConfiguration: BrokerConfiguration) { }

        public insertUsuario(arg0?: Usuario): Observable<Usuario> {
        return dwrWrapper(this.brokerConfiguration, 'usuarioService', 'insertUsuario', arg0) as Observable<Usuario>;
    }

    public updateUsuario(arg0?: Usuario): Observable<Usuario> {
        return dwrWrapper(this.brokerConfiguration, 'usuarioService', 'updateUsuario', arg0) as Observable<Usuario>;
    }

    public findUsuarioById(arg0?: number): Observable<Usuario> {
        return dwrWrapper(this.brokerConfiguration, 'usuarioService', 'findUsuarioById', arg0) as Observable<Usuario>;
    }

    public deleteUsuario(arg0?: number): Observable<void> {
        return dwrWrapper(this.brokerConfiguration, 'usuarioService', 'deleteUsuario', arg0) as Observable<void>;
    }


}



