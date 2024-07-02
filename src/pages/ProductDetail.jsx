import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const fetchProductDetail = async (id) => {
  const response = await fetch(`/api/products/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const ProductDetail = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["productDetail", id],
    queryFn: () => fetchProductDetail(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={data.image} alt={data.name} className="mb-2" />
        <p>{data.description}</p>
        <h3 className="mt-4 mb-2 text-lg font-semibold">Prices from different shops:</h3>
        <ul>
          {data.prices.map((shop) => (
            <li key={shop.name} className="flex justify-between">
              <span>{shop.name}</span>
              <span>{shop.price}</span>
              <Button as="a" href={shop.link} variant="link">
                Visit Shop
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ProductDetail;