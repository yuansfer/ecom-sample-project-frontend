import React from 'react'

const PaymentIcon = (props) =>
  <>
    {props.images.map((image, index) => (
      <div key={index} className={"col-xl-4 col-lg-4 col-md-6 col-sm-6"} ><div className={"img-wrapper mb-30 p-4"}><img className={"payment-method"} src={`../../assets/images/payment/logos/${image.name}`} alt="" /></div></div>
    ))}
  </>

export default PaymentIcon;