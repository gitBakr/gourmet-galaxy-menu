import { Card, CardContent } from "@/components/ui/card";

interface MenuItemProps {
  title: string;
  description: string;
  image: string;
  price: string;
}

const MenuItem = ({ title, description, image, price }: MenuItemProps) => {
  return (
    <Card className="menu-item overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold playfair mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-2">{description}</p>
          <p className="text-primary font-semibold">{price}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuItem;