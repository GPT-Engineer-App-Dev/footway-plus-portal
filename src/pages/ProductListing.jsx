import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const fetchProducts = async () => {
  const response = await fetch("/api/products");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const ProductListing = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.map((product) => (
        <Card key={product.id}>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={product.thumbnail} alt={product.name} className="mb-2" />
            <p>{product.description}</p>
            <div className="flex justify-between mt-4">
              <Button as={Link} to={`/products/${product.id}`} variant="outline">
                View Details
              </Button>
              <Button variant="secondary">Compare</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductListing;