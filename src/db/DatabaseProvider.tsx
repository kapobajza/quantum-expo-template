import { DatabaseContext, DatabaseRepository } from './context';

export const DatabaseProvider = ({
  children,
  repository,
}: {
  children: React.ReactNode;
  repository: DatabaseRepository;
}) => {
  return <DatabaseContext value={repository}>{children}</DatabaseContext>;
};
