const Footer = () => {
    return (
        <footer className="mt-60 bg-gray-200">
            <div className="flex justify-center items-center" style={{height:'386px'}}>
                <div className="flex items-center flex-1">
                <div className="mx-auto">
                    <img src="/fractls-footer-logo.png" alt="Logo" />
                </div>
                </div>
                <div className="ml-8 flex flex-1 justify-center items-center space-x-20">
                    <div>
                        <ul className="line-height-1.5">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Marketplace</a></li>
                            <li><a href="#">Liquidity Pool</a></li>
                        </ul>
                    </div>
                    <div>
                        <ul className="line-height-1.5 pr-60">
                            <li><a href="#">Medium</a></li>
                            <li><a href="#">Twitter</a></li>
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Discord</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
  };
  
export default Footer;