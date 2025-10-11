import { Bet, SportLeague } from "@utils";
import "./SportInput.css";
import { TextInput } from "@components/ui/inputs/TextInput";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type SportInputProps = {
  setMyBet: Dispatch<SetStateAction<Bet>>;
  value: string;
  disabled?: boolean;
};

export const SportInput = ({ disabled, value, setMyBet }: SportInputProps) => {
  const [findSport, setFindSport] = useState(value);
  const [showSearch, setShowSearch] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFindSport(value);
  }, [value]);

  const liiga = ["Liiga"];
  const allSports = [...Object.values(SportLeague), ...liiga];

  const filteredSport = allSports.filter((sport) =>
    sport.toLowerCase().includes(findSport.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setMyBet((prevBet) => ({
      ...prevBet,
      sport: newValue,
    }));
  };

  const handleSelectSuggestion = (sport: string) => {
    setFindSport(sport);
    setMyBet((prevBet) => ({
      ...prevBet,
      sport,
    }));
    setShowSearch(false);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setShowSearch(false);
    }
  }, []);

  useEffect(() => {
    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showSearch, handleClickOutside]);

  return (
    <div className="sport-input-container" ref={containerRef}>
      <div className="sport-input" data-testid="sport-input">
        <TextInput
          className="text-input"
          label="Sport / League"
          type="text"
          name="sport"
          id="sport"
          onChange={handleChange}
          onFocus={() => setShowSearch(true)}
          value={findSport}
          disabled={disabled}
          placeholder="e.g. Premier League"
        />
      </div>
      {showSearch && filteredSport.length > 0 && (
        <div className="sport-search">
          {filteredSport.map((sport) => (
            <button
              type="button"
              key={sport}
              className="sport-list"
              onClick={() => handleSelectSuggestion(sport)}
            >
              <p className="sport-name">{sport}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
