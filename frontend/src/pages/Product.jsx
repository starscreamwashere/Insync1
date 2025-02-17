import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/*----------- Product Data-------------- */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/*---------- Product Images------------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2 text-[#023047]">{productData.name}</h1>

          <p className="mt-5 text-3xl font-medium text-[#023047]">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <button
            onClick={() => addToCart(productData._id)}
            className="primary-btn bg-black text-white px-8 py-3 text-sm active:bg-gray-700 mt-8"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>6-month warranty included.</p>
            <p>SOLD BY : PRO-WIN HEALTHCARE PRIVATE LIMITED.</p>
          </div>
        </div>
      </div>

      {/* ---------- Description & Review Section ------------- */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm text-[#023047]">Description</b>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            <strong>IMPACTPURE</strong> is a highly advanced, eco-friendly water purification solution that ensures safe and clean drinking water from any source. With its unique <strong>8-stage filtration process</strong>, it guarantees <strong>99.9999% bacteria and virus removal</strong>, retains essential minerals, and ensures zero water wastage. The purifier is designed for ease of use, minimal maintenance, and maximum health benefits.
          </p>

          <h3 className="font-semibold">8-Stage Purification Process</h3>
          <ol className="list-decimal pl-5">
            <li><strong>S.S 304 Strainer for Filtering Suspended Impurities</strong> - Filters out larger particles, suspended impurities, and dirt from the water.</li>
            <li><strong>Hi-IV Activated Carbon for Chlorine and Bad Odour Removal</strong> - Removes chlorine, bad smells, and organic contaminants from the water.</li>
            <li><strong>Silver Impregnation for Bacteria Removal and Sterilization</strong> - Ensures the elimination of bacteria and prevents bacterial growth.</li>
            <li><strong>Pyramid Energy of Life for Healing Effects</strong> - Structured water enhances the hydration properties of water, making it easier for the body to absorb and utilize.</li>
            <li><strong>KDF (Kinetic Degradation Fluxion) for Heavy Metals and Toxic Removal</strong> - Removes harmful metals like lead, mercury, and other toxins from the water.</li>
            <li><strong>Constant Sterilization & Traditionally Proven Copper Benefits</strong> - Copper offers continuous sterilization and provides health benefits, ensuring clean, safe water.</li>
            <li><strong>0.01 Micron UF Membrane for Effective Purification</strong> - Guarantees 99.9999% removal of bacteria and viruses with a 0.01-micron ultrafiltration membrane.</li>
            <li><strong>Magnetized Water</strong> - Micro-clusters water for better absorption by the body, improving hydration and detoxification.</li>
          </ol>

          <h3 className="font-semibold mt-4">Unique Selling Propositions (USPs)</h3>
          <ul className="list-disc pl-5">
            <li>Bacteria & Virus Removal: Up to <strong>99.9999%</strong> bacteria and virus removal.</li>
            <li>Retains Essential Minerals: Unlike other systems, <strong>IMPACTPURE</strong> ensures that essential minerals like calcium, magnesium, and potassium are retained in the water.</li>
            <li>Zero Water Wastage: Unlike RO systems that waste water, <strong>IMPACTPURE</strong> has no water wastage.</li>
            <li>Eco-Friendly: Made from food-grade, non-toxic materials, the product is an environmentally friendly choice.</li>
            <li>Plug & Play: The system requires no installation, making it easy to set up and use.</li>
            <li>Certified and Tested: Independently tested and certified by NABL laboratories for effectiveness.</li>
            <li>Portable: Use it with any regular tap, narrow-mouth bottle, or sports sipper. It’s designed for convenience.</li>
            <li>Simple to Maintain: With DIY maintenance, <strong>IMPACTPURE</strong> is easy to clean and maintain, ensuring long-lasting performance.</li>
          </ul>

          <h3 className="font-semibold mt-4">Key Features</h3>
          <ul className="list-disc pl-5">
            <li><strong>Magnetohydrodynamics (MHD) Technology</strong>: Utilizes advanced MHD technology to condition hard water naturally and enhance its structure, ensuring clean and healthy hydration.</li>
            <li><strong>No Electricity Needed</strong>: Operates without power, making it eco-friendly and versatile.</li>
            <li><strong>Mobile and Convenient</strong>: Suitable for home, work, or outdoor use.</li>
            <li><strong>Minimal Plastics</strong>: Uses eco-friendly materials to reduce the carbon footprint.</li>
            <li><strong>Long-Term Reliability</strong>: Enjoy peace of mind for up to 10 years with an average cost of just ₹80 per month.</li>
            <li><strong>Copper Infused</strong>: Enhances water quality with health benefits.</li>
            <li><strong>Nanosilver Sterilization</strong>: Replaces traditional UV sterilization, providing equally effective results.</li>
            <li><strong>Advanced Filtration Stages</strong>: Includes UF, nano-silver, copper infusion, high-UV carbon, and KDF technology to remove bacteria, viruses, heavy metals, and pesticides.</li>
            <li><strong>Chemical Removal</strong>: Effectively eliminates harmful chemicals such as PFOA, PFAS, BPA, and microplastics to ensure safe drinking water.</li>
          </ul>

          <h3 className="font-semibold mt-4">Comparison Chart: IMPACTPURE vs. Others</h3>
          <table className="table-auto w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Feature</th>
                <th className="border px-4 py-2">IMPACTPURE</th>
                <th className="border px-4 py-2">Other Water Purifiers</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Certified & Independently Tested</td>
                <td className="border px-4 py-2">Yes</td>
                <td className="border px-4 py-2">No</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Water Wastage</td>
                <td className="border px-4 py-2">None</td>
                <td className="border px-4 py-2">Yes</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Water Quality</td>
                <td className="border px-4 py-2">99.9999% Bacteria & Virus Removal</td>
                <td className="border px-4 py-2">Varies</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Simple to Install</td>
                <td className="border px-4 py-2">Yes</td>
                <td className="border px-4 py-2">No</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Eco-Friendly</td>
                <td className="border px-4 py-2">Yes</td>
                <td className="border px-4 py-2">No</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Retains Essential Minerals</td>
                <td className="border px-4 py-2">Yes</td>
                <td className="border px-4 py-2">No</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Great Taste</td>
                <td className="border px-4 py-2">Yes</td>
                <td className="border px-4 py-2">No</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Magnet & Softening Effects</td>
                <td className="border px-4 py-2">Yes</td>
                <td className="border px-4 py-2">No</td>
              </tr>
            </tbody>
          </table>

          <h3 className="font-semibold mt-4">How to Use IMPACTPURE</h3>
          <ol className="list-decimal pl-5">
            <li>Use on Any Local Tap: Simply attach IMPACTPURE to any standard tap to start purifying the water.</li>
            <li>Use on Any Fancy Faucet: Works seamlessly with fancy faucets.</li>
            <li>Use on Any Sports Sipper: Perfect for outdoor or sports use, simply attach it to your sipper.</li>
            <li>Use on Any Narrow Mouth Bottle: Compatible with narrow-mouth bottles, perfect for on-the-go hydration.</li>
            <li>Use on Any Packaged Drinking Water Bottle: Use with packaged water bottles for instant purification.</li>
          </ol>

          <h3 className="font-semibold mt-4">How to Maintain & Clean</h3>
          <h4 className="font-semibold mt-2">For Regular Cleaning</h4>
          <p>Turn the product upside down and pass water through the outlet to backflush the dirt. Repeat as necessary to maintain cleanliness.</p>

          <h4 className="font-semibold mt-2">For Deep Cleaning</h4>
          <p>
            1. Open the unit by turning the threads in the middle of the two housings.<br />
            2. Push out the carbon block and clean it under running water.<br />
            3. Clean the stainless steel strainer by rinsing it.<br />
            4. Reverse the steps to restore the parts.
          </p>

          <h4 className="font-semibold mt-2">For UF Membrane Cleaning</h4>
          <p>Open the UF membrane by unscrewing the outlet nuts and other fixing parts. Shake and rinse the membrane in water to remove accumulated dirt.</p>

          <h3 className="font-semibold mt-4">Warranty & Terms</h3>
          <p>The warranty covers material defects and workmanship under normal usage for **6 months** from the date of purchase. It does not cover damages caused by misuse or accidents.</p>
          <p><strong>Exclusions:</strong> Misuse, accidents, unauthorized repairs, and any damage caused by non-authorized services are not covered under the warranty.</p>

          <h3 className="font-semibold mt-4">Technical Specifications</h3>
          <table className="table-auto w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Feature</th>
                <th className="border px-4 py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Model Name</td>
                <td className="border px-4 py-2">IMPACTPURE PL</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Type of Purifier</td>
                <td className="border px-4 py-2">Non-electric, Plug & Play</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Material of Construction</td>
                <td className="border px-4 py-2">High-Grade Stainless Steel and Food-Grade Plastic</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Cartridge Capacity</td>
                <td className="border px-4 py-2">3500 Liters</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Micron UF Membrane</td>
                <td className="border px-4 py-2">0.01 Micron</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Maximum Pressure</td>
                <td className="border px-4 py-2">6.5 PSI</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Warranty</td>
                <td className="border px-4 py-2">6 months from the date of purchase</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Maintenance</td>
                <td className="border px-4 py-2">DIY, Self-Maintainable</td>
              </tr>
            </tbody>
          </table>

          <h3 className="font-semibold mt-4">Awards & Recognitions</h3>
          <ul className="list-disc pl-5">
            <li>Green India Awards</li>
            <li>Most Innovative Healthcare Product of the Year</li>
            <li>Design Patent Certificate</li>
            <li>Best Green Innovation of the Year</li>
          </ul>

          <h3 className="font-semibold mt-4">How to Use & Install</h3>
          <p>Simply connect the IMPACTPURE purifier to any tap, narrow-mouth bottle, sports sipper, or packaged drinking water bottle. It's that easy! Enjoy pure and safe drinking water without the hassle.</p>
        </div>
      </div>


    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
