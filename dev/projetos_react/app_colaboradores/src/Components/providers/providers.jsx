import { AppProvider } from '../../Context/appContext';
import { AtividadeProvider } from '../../Context/atividadeContext';
import { ColaboradoresProvider } from '../../Context/colaboradoresContext';
import { RequisicaoProvider } from '../../Context/requisicaoContext';
import { SolicitantesProvider } from '../../Context/solicitantesContext';
import { TipoRequisicaoProvider } from '../../Context/tipoRequisicaoContext';

const Providers = ({ children }) => {
  return (
    <AppProvider>
      <TipoRequisicaoProvider>
        <AtividadeProvider>
          <SolicitantesProvider>
            <RequisicaoProvider>
              <ColaboradoresProvider>{children}</ColaboradoresProvider>
            </RequisicaoProvider>
          </SolicitantesProvider>
        </AtividadeProvider>
      </TipoRequisicaoProvider>
    </AppProvider>
  );
};

export default Providers;
