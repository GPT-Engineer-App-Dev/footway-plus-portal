import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockComparisonData = [
  {
    id: 1,
    name: "Product 1",
    attributes: {
      price: "$100",
      color: "Red",
      size: "M",
    },
  },
  {
    id: 2,
    name: "Product 2",
    attributes: {
      price: "$120",
      color: "Blue",
      size: "L",
    },
  },
];

const ComparisonView = () => {
  const [comparisonList, setComparisonList] = useState(mockComparisonData);

  const removeProduct = (id) => {
    setComparisonList(comparisonList.filter((product) => product.id !== id));
  };

  return (
    <div className="overflow-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Attribute</th>
            {comparisonList.map((product) => (
              <th key={product.id} className="py-2 px-4 border-b">
                {product.name}
                <Button variant="link" onClick={() => removeProduct(product.id)}>
                  Remove
                </Button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(comparisonList[0].attributes).map((attribute) => (
            <tr key={attribute}>
              <td className="py-2 px-4 border-b">{attribute}</td>
              {comparisonList.map((product) => (
                <td key={product.id} className="py-2 px-4 border-b">
                  {product.attributes[attribute]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonView;