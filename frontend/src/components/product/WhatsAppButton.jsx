
import Button from "../../common/Button";

const WhatsAppButton = ({
  sellerName,
  phoneNumber,
  productTitle,
}) => {
  const message = `Hi ${sellerName},

I found your "${productTitle}" on Wirely.

I'm interested in buying it.

Is it still available?`;

  const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <Button
      onClick={() =>
        window.open(
          whatsappUrl,
          "_blank"
        )
      }
    >
      💬 Contact Seller on WhatsApp
    </Button>
  );
};

export default WhatsAppButton;

