// "use client";
// import React, { useState } from "react";
// import Script from "next/script";

// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// const PaymentPage = () => {
//   const AMOUNT = 100; // Constant amount in INR
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handlePayment = async () => {
//     setIsProcessing(true);
//     try {
//       const response = await fetch("/api/create-order", { method: "POST" });
//       const data = await response.json();

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         amount: AMOUNT * 100,
//         currency: "INR",
//         name: "Wealthy Wise",
//         description: "Test Transaction",
//         order_id: data.orderId,
//         handler: function(response: any) {
//           console.log("Payment Successful", response);
//         },
//         prefill: {
//           name: "John Doe",
//           email: "John.Doe@gmail.com",
//           contact: "9999999999",
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };
//       const rzp1 = new window.Razorpay(options);
//       rzp1.open();
//     } catch (error) {
//       console.error("Payment Failed", error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <Script src="https://checkout.razorpay.com/v1/checkout.js" />
//       <div className="p-6 bg-white rounded-lg shadow-md">
//         <p className="mb-4">Amount to Pay: {AMOUNT} INR</p>
//         <button
//           onClick={handlePayment}
//           disabled={isProcessing}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
//         >
//           {isProcessing ? "Processing..." : "Pay Now"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;


// "use client";
// import React, { useState } from "react";
// import Script from "next/script";

// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// interface RazorpayResponse {
//   razorpay_payment_id: string;
//   razorpay_order_id: string;
//   razorpay_signature: string;
// }

// interface OrderResponse {
//   orderId: string;
// }

// const PaymentPage = () => {
//   const AMOUNT = 100;
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handlePayment = async () => {
//     setIsProcessing(true);
//     try {
//       const response = await fetch("/api/create-order", { method: "POST" });
//       const data: OrderResponse = await response.json();

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         amount: AMOUNT * 100,
//         currency: "INR",
//         name: "Wealthy Wise",
//         description: "Test Transaction",
//         order_id: data.orderId,
//         handler: (response: RazorpayResponse) => {
//           console.log("Payment Successful", response);
//         },
//         prefill: {
//           name: "John Doe",
//           email: "John.Doe@gmail.com",
//           contact: "9999999999",
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const rzp1 = new window.Razorpay(options);
//       rzp1.open();
//     } catch (error) {
//       console.error("Payment Failed", error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <Script src="https://checkout.razorpay.com/v1/checkout.js" />
//       <div className="p-6 bg-white rounded-lg shadow-md">
//         <p className="mb-4">Amount to Pay: {AMOUNT} INR</p>
//         <button
//           onClick={handlePayment}
//           disabled={isProcessing}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
//         >
//           {isProcessing ? "Processing..." : "Pay Now"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;



"use client";
import React, { useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
}

interface RazorpayInstance {
  open: () => void;
  close: () => void;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface OrderResponse {
  orderId: string;
}

const PaymentPage = () => {
  const AMOUNT = 100;
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/create-order", { method: "POST" });
      const data: OrderResponse = await response.json();

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: AMOUNT * 100, // Amount in paise
        currency: "INR",
        name: "Wealthy Wise",
        description: "Test Transaction",
        order_id: data.orderId,
        handler: (response: RazorpayResponse) => {
          console.log("Payment Successful", response);
        },
        prefill: {
          name: "John Doe",
          email: "John.Doe@gmail.com",
          contact: "7517207273",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment Failed", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="p-6 bg-white rounded-lg shadow-md">
        <p className="mb-4">Amount to Pay: {AMOUNT} INR</p>
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
