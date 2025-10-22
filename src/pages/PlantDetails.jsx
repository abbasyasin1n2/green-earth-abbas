import { useParams } from 'react-router';

const PlantDetails = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto py-20">
      <h1 className="text-4xl font-bold text-center text-[#2F5233]">
        Plant Details Page - Coming Soon 🪴
      </h1>
      <p className="text-center mt-4 text-gray-600">
        Details for plant ID: {id}
      </p>
    </div>
  );
};

export default PlantDetails;

