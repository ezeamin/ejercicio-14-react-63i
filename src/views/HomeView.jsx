import { useSession } from '../stores/useSession';

const HomeView = () => {
  const { user } = useSession();

  console.log(user);

  return <div>HomeView</div>;
};
export default HomeView;
