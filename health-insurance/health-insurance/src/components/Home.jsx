import React from 'react';


function Home() {
    return (
        <div className="home-container">
            <div className="home-content">
                <div className="text-section">

             
                    <h2>Medical Health Plans for every stage of your life</h2>
                    <p>Health Insurance is the key to your financial wellness</p>

                    
                    <section>
                        <h3>Benefits of Health Insurance</h3>
                        <ul>
                            <li><strong>Financial Protection</strong></li>
                            <li><strong>Access to Quality Care</strong> </li>
                            <li><strong>Preventive Services</strong> </li>
                            <li><strong>Peace of Mind</strong> </li>
                        </ul>
                    </section>

                    <section>
                        <h3>Our Policies</h3>
                        <ul>
                            <li><strong>Health - Ultra</strong> </li>
                            <li><strong>Health - Premium</strong> </li>
                            <li><strong>Health - General</strong> </li>
                        </ul>
                    </section>

              

                    <section>
                       
                        <p>
                            For more information or assistance with your health insurance needs, please contact us.
                        </p>
                      
                    </section>
                </div>
            </div>
            <div className="home-image-section">
                <img
                    src="https://1finance.co.in/magazine/wp-content/uploads/2023/06/16404392_tp212-socialmedia-02-1-scaled.jpg"
                    alt="Health Insurance 1"
                />
                <img
                    src="https://media.assettype.com/theceo%2F2023-12%2F7964c34a-50cf-4c65-adbd-0df9401e1c48%2FHEALTH.png?w=1200&auto=format%2Ccompress&fit=max"
                    alt="Health Insurance 2"
                />
            </div>
        </div>
    );
}

export default Home;
