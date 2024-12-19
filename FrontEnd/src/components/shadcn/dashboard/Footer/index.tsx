import { FacebookIcon, InstagramIcon, LinkedinIcon, LinkIcon, MailIcon, PhoneCallIcon, PhoneIcon } from "lucide-react";

export const Footer = () => {
  const ano_atual = new Date().getFullYear();

  return (
    <footer id="contactos" className="bg-green-700 p-6 sm:p-10 text-center text-white">
      <div className="flex flex-wrap justify-around gap-6 md:gap-10 mb-8">
        
        {/* Redes Sociais */}
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-6">
          <h1 className="font-semibold text-xl mb-4">Redes Sociais</h1>
          <div className="flex gap-4 justify-center mb-4">
            <a href="https://www.facebook.com/farmacia.co" className="text-green-500 hover:text-white transition-all">
              <FacebookIcon className="w-6 h-6" />
            </a>
            <a href="https://www.instagram.com/farmacia" className="text-green-500 hover:text-white transition-all">
              <InstagramIcon className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/farmacia" className="text-green-500 hover:text-white transition-all">
              <LinkedinIcon className="w-6 h-6" />
            </a>
          </div>
          <ul className="text-sm">
            <li>
              <a className="hover:text-green-950 hover:scale-105 transition-all" href="https://www.facebook.com/farmacia.co">www.facebook.com/farmacia.co</a>
            </li>
            <li>
              <a className="hover:text-green-950 hover:scale-105 transition-all" href="https://www.instagram.com/farmacia">www.instagram.com/farmacia</a>
            </li>
            <li>
              <a className="hover:text-green-950 hover:scale-105 transition-all" href="https://www.linkedin.com/farmacia">www.linkedin.com/farmacia</a>
            </li>
          </ul>
        </div>

        {/* Contactos */}
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-6">
          <h1 className="font-semibold text-xl mb-4">Contactos</h1>
          <div className="flex gap-4 justify-center mb-4">
            <a href="mailto:farmacia@gmail.com" className="text-green-500 hover:text-white transition-all">
              <MailIcon className="w-6 h-6" />
            </a>
            <a href="tel:+244931441242" className="text-green-500 hover:text-white transition-all">
              <PhoneIcon className="w-6 h-6" />
            </a>
            <a href="tel:+244998441242" className="text-green-500 hover:text-white transition-all">
              <PhoneCallIcon className="w-6 h-6" />
            </a>
          </div>
          <ul className="text-sm">
            <li>
              <a className="hover:text-green-950 hover:scale-105 transition-all" href="mailto:farmacia@gmail.com">farmacia@gmail.com</a>
            </li>
            <li>
              <a className="hover:text-green-950 hover:scale-105 transition-all" href="tel:+244931441242">+244 931 441 242</a>
            </li>
            <li>
              <a className="hover:text-green-950 hover:scale-105 transition-all" href="tel:+244998441242">+244 998 441 242</a>
            </li>
          </ul>
        </div>

        {/* Outros */}
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-6">
          <h1 className="font-semibold text-xl mb-4">Outros</h1>
          <p className="text-sm flex items-start gap-2 text-green-400">
            <LinkIcon className="w-5 h-5" />
            Visite nossas páginas e solicite-nos, ou então, vá até as nossas instalações e adquira o seu produto de forma calorosa para que a sua saúde fique estável. Estamos localizados em Angola (Luanda), propriamente em Viana nos Mulenvos.
          </p>
        </div>
      </div>

      <nav className="text-sm">
        <p>&copy; Copyright {ano_atual}</p>
      </nav>
    </footer>
  );
};

export default Footer;
