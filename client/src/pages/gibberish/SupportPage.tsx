import { Container2 } from "../../components/ui/v2/container/Container2";
import "./Gibberish.css";
import mobileqr from "../../assets/images/support/mobilepay-qr.png";
import revolutqr from "../../assets/images/support/revolut-qr.png";
import solqr from "../../assets/images/support/sol-qr.png";
import bitcoinqr from "../../assets/images/support/btc-qr.png";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faQuestion, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Button2 } from "../../components/ui/v2/button/Button2";

interface SupportCardProps {
  id: number;
  title: string;
  shortText: string;
  shortAnswer: string;
  linkText: string;
  linkUrl: string;
  figureImage: string;
  figureAlt: string;
  showQr: boolean;
  crypto?: string;
  onToggleQr: (id: number) => void;
}

const SupportCard = ({
  id,
  title,
  shortText,
  shortAnswer,
  linkText,
  linkUrl,
  figureImage,
  figureAlt,
  showQr,
  crypto,
  onToggleQr,
}: SupportCardProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    if (!crypto) return;

    try {
      await navigator.clipboard.writeText(crypto);
      setCopied(true);
      // Reset the copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Container2>
      <div className="support-card">
        <h4 className="way-to-support">{title}</h4>
        <div className="short-way">
          <p>{shortText}</p> <span>{shortAnswer}</span>
        </div>
        <p className="or-block">or</p>
        <div className="link-way">
          <p>{linkText}</p>{" "}
          {id < 3 ? (
            <a href={linkUrl} target="_blank" rel="noopener noreferrer">
              <span>click here</span>
            </a>
          ) : (
            <Button2 className="btn2-outline" onClick={copyToClipboard}>
              <div className="btn2-icon">
                <FontAwesomeIcon icon={copied ? faCheck : faCopy} size="sm" />
                <p>{copied ? "Copied!" : "Copy"}</p>
              </div>
            </Button2>
          )}
        </div>
        <p className="or-block">or</p>

        <div
          className="qr-way"
          onClick={() => onToggleQr(id)}
          data-testid={`qr-toggle-${id}`}
        >
          <p className="show-qr">Show QR Code</p>
          <div className={`qr ${showQr ? "flipped" : ""}`}>
            <div className="qr-inner">
              <div className="qr-front">
                <FontAwesomeIcon icon={faQuestion} size="2xl" />
              </div>
              <div className="qr-back">
                <img src={figureImage} alt={figureAlt} title={figureAlt} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container2>
  );
};

const Support = () => {
  const [showQr, setShowQr] = useState<number | null>(null);

  const toggleQr = (id: number) => {
    setShowQr((prev) => (prev === id ? null : id));
  };

  const supportChoices = [
    {
      id: 1,
      title: "MobilePay",
      shortText: "With Number",
      shortAnswer: "3913YS",
      linkText: "Via Link",
      linkUrl:
        "https://qr.mobilepay.fi/box/b4f6650f-cffc-4129-b238-29162aa44976/pay-in",
      figureImage: mobileqr,
      figureAlt: "MobilePay QR Code",
    },
    {
      id: 2,
      title: "Revolut",
      shortText: "With Username",
      shortAnswer: "repewow",
      linkText: "Via Link",
      linkUrl: "https://revolut.me/repewow",
      figureImage: revolutqr,
      figureAlt: "Revolut QR Code",
    },
    {
      id: 3,
      title: "Bitcoin",
      shortText: "Network",
      shortAnswer: "BTC",
      linkText: "Via Address",
      linkUrl: "https://revolut.me/repewow",
      figureImage: bitcoinqr,
      figureAlt: "Bitcoin QR Code",
      crypto: "3CrAaXguhqb5ELS6dMoo7AUwodKUbJXtnQ",
    },
    {
      id: 4,
      title: "Solana",
      shortText: "Network",
      shortAnswer: "SOL",
      linkText: "Via Address",
      linkUrl: "https://revolut.me/repewow",
      figureImage: solqr,
      figureAlt: "Solana QR Code",
      crypto: "9TTM6geUTBWAvwXgC7EiPjmgRHmT7iUw4CC4rkio9qpd",
    },
  ];

  return (
    <div className="gibberish-page">
      <div className="gibberish-content full-width">
        <h2>Support Me</h2>
        <div className="gibberish-text fixed-width">
          <p>
            Spare some change? It'll make me grin and keep this thing running.
            No pressure, though.
          </p>
        </div>
        <div className="support-cards-list">
          {supportChoices.map((support) => (
            <SupportCard
              key={support.id}
              {...support}
              showQr={showQr === support.id}
              onToggleQr={toggleQr}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;
