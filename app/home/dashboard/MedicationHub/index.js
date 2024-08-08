import React, { useState, useEffect } from "react";
import { Button, Heading, SkeletonPlaceholder, Tooltip } from "@carbon/react";
import {
  BreakingChange,
  ChevronLeft,
  ChevronRight,
  Favorite,
  Hearing,
  ShoppingBag,
} from "@carbon/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import TitlePanel from "@/components/TitlePanel";
import BackButton from "@/components/Button/back";
import Timeline from "../../../../components/Timeline";
import MyExpandableTile from "../../../../components/ExpandableTile";
import "./styles.scss";

function MedicationHub({ handleBackToDashboard }) {
  const appointments = [
    { time: "2024-06-09T08:00:00", description: "Breakfast Meeting" },
    { time: "2024-06-09T07:00:00", description: "Breakfast Meeting" },
    { time: "2024-06-09T06:00:00", description: "Breakfast Meeting" },
    { time: "2024-06-09T59:00:00", description: "Breakfast Meeting" },
    { time: "2024-06-09T04:00:00", description: "Breakfast Meeting" },
    { time: "2024-06-09T11:00:00", description: "Team Standup" },
    { time: "2024-06-09T14:00:00", description: "Client Call" },
    { time: "2024-06-09T16:00:00", description: "Project Review" },
    { time: "2024-06-09T17:00:00", description: "Project Review" },
    { time: "2024-06-09T15:00:00", description: "Project Review" },
    { time: "2024-06-09T18:00:00", description: "Project Review" },
    { time: "2024-06-09T19:00:00", description: "Project Review" },
    { time: "2024-06-09T20:00:00", description: "Project Review" },
  ];

  const tiles = [
    {
      id: "tile-1",
      heading: "Paracetamol",
      firstUseIcon: (
        <Tooltip label="Helps reduce pain and fever" enterDelayMs={0} leaveDelayMs={300}>
          <Favorite />
        </Tooltip>
      ),
      secondUseIcon: (
        <Tooltip label="May aid cognitive functions" enterDelayMs={0} leaveDelayMs={300}>
          <Hearing />
        </Tooltip>
      ),
      thirdUseIcon: (
        <Tooltip label="May have cardiovascular benefits" enterDelayMs={0} leaveDelayMs={300}>
          <BreakingChange />
        </Tooltip>
      ),
      spoons: "2",
      afterBefore: "After",
      AmPm: "Pm",
      daysLeft: "7",
      description:
        "Paracetamol is a widely used medication known for its effectiveness in reducing pain and fever. It may also have benefits for cognitive functions and cardiovascular health.",
    },
    {
      id: "tile-2",
      heading: "Ibuprofen",
      firstUseIcon: (
        <Tooltip label="Helps relieve pain and inflammation" enterDelayMs={0} leaveDelayMs={300}>
          <Favorite />
        </Tooltip>
      ),
      secondUseIcon: (
        <Tooltip label="May support brain health" enterDelayMs={0} leaveDelayMs={300}>
          <Hearing />
        </Tooltip>
      ),
      thirdUseIcon: (
        <Tooltip label="May have protective effects on the heart" enterDelayMs={0} leaveDelayMs={300}>
          <BreakingChange />
        </Tooltip>
      ),
      spoons: "1",
      afterBefore: "Before",
      AmPm: "Am",
      daysLeft: "10",
      description:
        "Ibuprofen is commonly used to relieve pain and inflammation. It is also associated with potential benefits for brain health and cardiovascular protection.",
    },
    {
      id: "tile-5",
      heading: "Flagyl",
      firstUseIcon: (
        <Tooltip label="Antibiotic used to treat various infections" enterDelayMs={0} leaveDelayMs={300}>
          <Favorite />
        </Tooltip>
      ),
      secondUseIcon: (
        <Tooltip label="May have neurological effects" enterDelayMs={0} leaveDelayMs={300}>
          <Hearing />
        </Tooltip>
      ),
      thirdUseIcon: (
        <Tooltip label="May affect heart health" enterDelayMs={0} leaveDelayMs={300}>
          <BreakingChange />
        </Tooltip>
      ),
      spoons: "1",
      afterBefore: "Before",
      AmPm: "Am",
      daysLeft: "10",
      description:
        "Flagyl is an antibiotic used to treat various infections. It may also have effects on neurological and cardiovascular health.",
    },
    {
      id: "tile-3",
      heading: "Piriton",
      firstUseIcon: (
        <Tooltip label="Antihistamine used for allergy relief" enterDelayMs={0} leaveDelayMs={300}>
          <Favorite />
        </Tooltip>
      ),
      secondUseIcon: (
        <Tooltip label="May affect brain function" enterDelayMs={0} leaveDelayMs={300}>
          <Hearing />
        </Tooltip>
      ),
      thirdUseIcon: (
        <Tooltip label="May impact heart health" enterDelayMs={0} leaveDelayMs={300}>
          <BreakingChange />
        </Tooltip>
      ),
      spoons: "1",
      afterBefore: "Before",
      AmPm: "Am",
      daysLeft: "10",
      description:
        "Piriton is an antihistamine commonly used for allergy relief. It may also influence brain function and cardiovascular health.",
    },
    {
      id: "tile-4",
      heading: "Cetrizine",
      firstUseIcon: (
        <Tooltip label="Antihistamine for allergy symptoms" enterDelayMs={0} leaveDelayMs={300}>
          <Favorite />
        </Tooltip>
      ),
      secondUseIcon: (
        <Tooltip label="May support brain health" enterDelayMs={0} leaveDelayMs={300}>
          <Hearing />
        </Tooltip>
      ),
      thirdUseIcon: (
        <Tooltip label="May have cardiovascular benefits" enterDelayMs={0} leaveDelayMs={300}>
          <BreakingChange />
        </Tooltip>
      ),
      spoons: "1",
      afterBefore: "Before",
      AmPm: "Am",
      daysLeft: "10",
      description:
        "Cetrizine is an antihistamine used to alleviate allergy symptoms. It may also promote brain health and cardiovascular well-being.",
    },
  ];
  
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(tiles.length / pageSize);
  const visibleTiles = tiles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const [expandedTile, setExpandedTile] = useState(null);

  const handleExpand = (id) => {
    setExpandedTile(expandedTile === id ? null : id);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setLoading(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setLoading(false);
      }, 1000);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setLoading(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setLoading(false);
      }, 1000); 
    }
  };
const [isMobile, setMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 760) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <motion.div
      className="medicationHub"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <TitlePanel>
        <div className="button-area">
          <BackButton onClick={handleBackToDashboard} />
          <Heading className="med-title" style={{ fontWeight: "bold" }}>Medication Hub</Heading>
        </div>
        <div className="medic-annotations">
          {isMobile ? (
            <Button
              kind="secondary"
              hasIconOnly
              renderIcon={ShoppingBag}
              iconDescription="prescription"
              size="sm"
            />
          ) : (
            <Button
              kind="secondary"
              size="sm"
              renderIcon={ShoppingBag}
              iconDescription="prescription"
            >
              Prescription
            </Button>
          )}
          {isMobile ? (
            <Button
            hasIconOnly
              renderIcon={ShoppingBag}
              kind="tertiary"
              iconDescription="over the shelf"
              size="sm"
            />
          ) : (
            <Button
              size="sm"
              hasIcon
              renderIcon={ShoppingBag}
              kind="tertiary"
              iconDescription="TrashCan"
            >
              Over the shelf
            </Button>
          )}
        </div>
      </TitlePanel>
      <div className="my-timeline">
        <Timeline appointments={appointments} />
      </div>
      <div className="my-prescriptions">
        <AnimatePresence>
          {loading ? (
            <SkeletonPlaceholder style={{ width: "100%", height: "100%" }} />
          ) : (
            visibleTiles.map((tile) => (
              <motion.div
                key={tile.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <MyExpandableTile
                  id={tile.id}
                  heading={tile.heading}
                  firstUseIcon={tile.firstUseIcon}
                  secondUseIcon={tile.secondUseIcon}
                  thirdUseIcon={tile.thirdUseIcon}
                  spoons={tile.spoons}
                  afterBefore={tile.afterBefore}
                  AmPm={tile.AmPm}
                  daysLeft={tile.daysLeft}
                  description={tile.description}
                  expanded={expandedTile === tile.id}
                  onToggleExpand={handleExpand}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
      <div className="pagination">
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          hasIconOnly
          iconDescription="Previous page"
          renderIcon={ChevronLeft}
        />

        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          hasIconOnly
          iconDescription="Next page"
          renderIcon={ChevronRight}
        />
      </div>
    </motion.div>
  );
}

export default MedicationHub;
``;
