import './pageHeader.css';

const PageHeader = ({ title }) => {
  return (
    <div className="PageHeader">
      <h1>{title}</h1>
    </div>
  );
};

export default PageHeader;
