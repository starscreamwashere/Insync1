import React from 'react';
import Title from '../components/Title';
import { motion } from "framer-motion";
import { SlideRight, SlideLeft, SlideDownFade, ZoomLeft, RotateUp, FlipRight } from "../utility/animation";

const TandC = () => {
  return (
    <div>
      {/* Terms and Conditions Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }} // Start with low opacity and slightly higher position
        whileInView={{ opacity: 1, y: 0 }} // Fade in and move to normal position (down to up)
        transition={{ duration: 1, delay: 0.2 }} // Smooth transition
        viewport={{ once: true }} // Animate only the first time the element comes into view 
        className="text-2xl text-center pt-8">
        <Title text1={'TERMS'} text2={'AND CONDITIONS'} />
      </motion.div>

      <div className="my-10 flex flex-col gap-6 px-6 text-sm text-gray-500">
        <p>
          <strong>Kalki Ecosphere LLP</strong> warrants all new products manufactured by it to be free from defects in material and workmanship under normal usage from the date of purchase as under:
        </p>

        <p>
          The warranty period commences from the date of purchase by the first end-user. During this warranty period of 6 Months, Kalki Ecosphere will replace or repair any part of the <strong>IMPACTPURE</strong> water purifier that in the opinion of Kalki Ecosphere would be defective in operation due to faulty material or workmanship.
        </p>

        <p>
          The original purchaser of the unit can avail services under Warranty at the point of sale, by producing the damaged part along with the original invoice.
        </p>

        <p>
          This Warranty is void if the unit is not operated under normal municipal water or well water conditions or subjected to the temperature above 35°C or Below 4°C.
        </p>

        <p>
          Product returned to Kalki Ecosphere for Warranty examination must be shipped freight prepaid.
        </p>

        <p>
          Kalki Ecosphere shall not be held liable for claims exceeding the cost of repair of the defects in workmanship.
        </p>

        <p>
          This Warranty Agreement shall not be interpreted to render Kalki Ecosphere LLP liable for injuries or damages of any kind direct or consequential or contingent to persons or property.
        </p>

        <p>
          Kalki Ecosphere shall not be held responsible by representative or any buyer for failure to abide by any of the obligations of this Warranty Agreement if such failures are the result of circumstances of Force Majeures such as, but not limited to, floods, earthquakes, transportation strikes, labour disputes with outside suppliers or any other condition beyond the control of Kalki Ecosphere.
        </p>

        <p>
          Kalki Ecosphere reserves the right to alter or improve design and specifications at any time, without any contingent obligations to prospective buyers or owners of the products previously sold.
        </p>

        <p>
          Kalki Ecosphere LLP will not be held liable for repair or alterations made without prior written approval; for products clogged by suspended matter, precipitates or biological growth or for failures resulting from the lack of proper maintenance.
        </p>

        <p>
          Kalki Ecosphere cannot and shall not be held liable for any sickness or illness due to the consumption of drinking water from any water purifier supplied by Kalki Ecosphere, since Kalki Ecosphere does not have any control over the maintenance and usage of water purifier.
        </p>

        <p>
          This Warranty excludes all products/component parts or damage to any part of this water purifier which, in the opinion of Kalki Ecosphere, have been subjected to misuse; misapplication; negligence; alteration; accident or operation contrary to our instructions, incompatibility with accessories not installed by Kalki Ecosphere that have been repaired with component part other than those manufactured by or obtained from Kalki Ecosphere. Damage caused by freezing, flood, fire or Act of God is not covered by this Warranty. In all such cases regular charges will apply. This limited Warranty does not include service to diagnose a claimed malfunction in this unit.
        </p>

        <p>
          Any disagreement and obligations based upon the purchase of Kalki Ecosphere products and thereby imposed on Kalki Ecosphere shall be governed by and construed according to the laws of India and subject to the jurisdiction of Mumbai Courts only.
        </p>

        <p>
          Kalki Ecosphere assumes no Warranty liability in connection with this water purifier other than that specified herein. This Warranty is in lieu of all other warranties, expressed implied, including or warranties of fitness for a particular purpose. Kalki Ecosphere does not authorize any person or representative to assume for them any other obligations on the sale of this water purifier.
        </p>

        <p>
          Under no circumstances are the terms mentioned above negotiable and no employee of Kalki Ecosphere LLP has the authority to supersede them.
        </p>
      </div>
    </div>
  );
};

export default TandC;
