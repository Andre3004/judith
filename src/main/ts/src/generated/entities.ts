export interface Sort {
    orders: SortOrder[]
}

export interface SortOrder {
    direction: SortDirection,
    property: string,
    nullHandlingHint?: NullHandling
}

export type SortDirection = 'ASC' | 'DESC';
export type NullHandling = 'NATIVE' | 'NULLS_FIRST' | 'NULLS_LAST';

export interface Pageable {
    page: number,
    size: number,
    sort?: Sort
}

export interface PageRequest extends Pageable {}

export interface Page<T> {
    content: T[],
    totalElements: number,
    numberOfElements: number,
    totalPages: number,
    pageable?: PageRequest
}

export interface IntlString {
    value: string;
    values: {
        [key: string]: string;
    };
}

export interface Lancamento {
    categoria?: Categoria,
    conta?: Conta,
    tipo?: TipoLancamento,
    descricao?: string,
    dataVencimento?: Date,
    valor?: number,
    situacaoLancamento?: SituacaoLancamento,
    baixaAutomatica?: Boolean,
    dataPagamento?: Date,
    valorPago?: number,
    contaDestino?: Conta,
    repetir?: Boolean,
    formaPagamento?: FormaPagamento,
    parcelasTotal?: number,
    parcelasPagas?: number,
    quantidadePeriodo?: number,
    favorecidoPagador?: Terceiro,
    periodoPagamento?: Periodo,
    quantidadeRepeticaoRecorrencia?: number,
    periodoNotificacao?: Periodo,
    quantidadeNotificacaoVencimento?: number,
    id?: number,
    created?: Date,
    updated?: Date
}


export let TipoLancamentoValues: string[] = ['RECEITA', 'DESPESA', 'TRANSFERENCIA'];
export type TipoLancamento = 'RECEITA' | 'DESPESA' | 'TRANSFERENCIA';


export let TipoContaValues: string[] = ['CONTROLE_INTERNO', 'CARTAO_CREDITO', 'CONTA_CORRENTE', 'POUPANCA'];
export type TipoConta = 'CONTROLE_INTERNO' | 'CARTAO_CREDITO' | 'CONTA_CORRENTE' | 'POUPANCA';


export interface Endereco {
    bairro?: string,
    complemento?: string,
    cidade?: string,
    cep?: string,
    numero?: number,
    id?: number,
    created?: Date,
    updated?: Date
}


export interface Usuario {
    nome?: string,
    cpf?: string,
    email?: string,
    senha?: string,
    telefone?: string,
    endereco?: Endereco,
    contas?: Conta[],
    id?: number,
    created?: Date,
    updated?: Date
}


export interface Categoria {
    nome?: string,
    categoriaPai?: Categoria,
    isSelected?: Boolean,
    subCategorias?: Categoria[],
    id?: number,
    created?: Date,
    updated?: Date
}


export interface Banco {
    nome?: string,
    id?: number,
    created?: Date,
    updated?: Date
}


export interface Conta {
    nome?: string,
    saldoInicial?: number,
    saldo?: number,
    tipo?: TipoConta,
    banco?: Banco,
    dataUltAltSaldo?: Date,
    usuario?: Usuario,
    lancamentos?: Lancamento[],
    id?: number,
    created?: Date,
    updated?: Date
}


export let SituacaoLancamentoValues: string[] = ['LIQUIDADO', 'PENDENTE'];
export type SituacaoLancamento = 'LIQUIDADO' | 'PENDENTE';


export let PeriodoValues: string[] = ['SEGUNDO', 'MINUTO', 'HORA', 'DIA', 'SEMANA', 'MES', 'ANO'];
export type Periodo = 'SEGUNDO' | 'MINUTO' | 'HORA' | 'DIA' | 'SEMANA' | 'MES' | 'ANO';


export let FormaPagamentoValues: string[] = ['FIXA', 'PARCELADO'];
export type FormaPagamento = 'FIXA' | 'PARCELADO';


export interface Terceiro {
    nome?: string,
    id?: number,
    created?: Date,
    updated?: Date
}



