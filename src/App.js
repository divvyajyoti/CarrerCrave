import React, { useState, useEffect } from "react";
import "./App.css";
import MenuIcon from "@mui/icons-material/Menu";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import Switch from "@mui/material/Switch";
const App = () => {
  const [sections, setSections] = useState([
    {
      id: 1,
      name: "Profile Summary",
      enabled: true,
      description: "Add your profile summary"
    },
    {
      id: 2,
      name: "Academic and Cocurricular Achievements",
      enabled: true,
      description: "Add your academic and cocurricular achievements"
    },
    {
      id: 3,
      name: "Summer Internship Experience",
      enabled: true,
      description: "Add your summer internship experience"
    },
    {
      id: 4,
      name: "Work Experience",
      enabled: true,
      description: "Add your work experience"
    },
    {
      id: 5,
      name: "Projects",
      enabled: true,
      description: "Add your projects"
    },
    {
      id: 6,
      name: "Certifications",
      enabled: true,
      description: "Add your certifications"
    },
    {
      id: 7,
      name: "Leadership Positions",
      enabled: true,
      description: "Add your leadership positions"
    },
    {
      id: 8,
      name: "Extracurricular",
      enabled: true,
      description: "Add your extracurricular activities"
    },
    {
      id: 9,
      name: "Education",
      enabled: true,
      description: "Add your education details"
    }
  ]);

  const [isDragging, setIsDragging] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleDragStart = (event, sectionId) => {
    setIsDragging(true);
    event.dataTransfer.setData("sectionId", sectionId);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetSectionId) => {
    event.preventDefault();
    const draggedSectionId = event.dataTransfer.getData("sectionId");
    if (draggedSectionId && draggedSectionId !== targetSectionId) {
      const updatedSections = [...sections];
      const draggedSectionIndex = updatedSections.findIndex(
        (section) => section.id.toString() === draggedSectionId
      );
      const targetSectionIndex = updatedSections.findIndex(
        (section) => section.id.toString() === targetSectionId
      );
      const draggedSection = updatedSections[draggedSectionIndex];
      updatedSections.splice(draggedSectionIndex, 1);
      updatedSections.splice(targetSectionIndex, 0, draggedSection);
      setSections(updatedSections);
      setHasChanges(true);
    }
    setIsDragging(false);
  };

  const handleSectionToggle = (sectionId) => {
    const updatedSections = [...sections];
    const sectionIndex = updatedSections.findIndex(
      (section) => section.id.toString() === sectionId
    );
    updatedSections[sectionIndex].enabled = !updatedSections[sectionIndex]
      .enabled;
    setSections(updatedSections);
    setHasChanges(true);
  };

  const handleSave = () => {
    // Save functionality
  };

  const [readOnly, setReadOnly] = useState();
  const [input, setInput] = useState();
  const [save, setSave] = useState();

  useEffect(() => {
    let r = [];
    let i = [];
    let s = [];
    if (sections) {
      i = sections.map((el) => el.name);
      r = sections.map((el) => true);
      s = sections.map((el) => false);
    }
    setReadOnly(r);
    setInput(i);
    setSave(s);
  }, [sections]);

  const handleSectionEdit = (sectionId) => {
    let r = [...readOnly];

    if (r[parseInt(sectionId) - 1]) {
      r[parseInt(sectionId) - 1] = false;
      setReadOnly(r);
    } else {
      r[parseInt(sectionId) - 1] = true;
      setReadOnly(r);
    }

    if (!readOnly[parseInt(sectionId) - 1]) {
      console.log(sectionId);
      let s = [...save];
      s[parseInt(sectionId) - 1] = false;
      console.log(s);
      setSave(s);

      const newSectionName = input[parseInt(sectionId) - 1];
      if (newSectionName) {
        const updatedSections = [...sections];
        const sectionIndex = updatedSections.findIndex(
          (section) => section.id.toString() === sectionId
        );
        updatedSections[sectionIndex].name = newSectionName;
        setSections(updatedSections);
        setHasChanges(true);
      }
    } else {
      let s = [...save];
      s[parseInt(sectionId) - 1] = true;
      setSave(s);
      console.log(1);
    }
  };

  return (
    <div className="Box">
      <h2>Select your sections</h2>
      <div className="MainBox">
        {sections.map((section) => (
          <div
            className="InnerBox"
            key={section.id}
            draggable={!isDragging}
            onDragStart={(event) =>
              handleDragStart(event, section.id.toString())
            }
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDrop={(event) => handleDrop(event, section.id.toString())}
          >
            <div className="details">
              <p>
                <MenuIcon
                  style={{
                    alignSelf: "center",
                    fontSize: "1.3rem",
                    color: "black"
                  }}
                />
              </p>

              <p
                onClick={() => alert(section.description)}
                style={{ alignSelf: "center" }}
              >
                <InfoOutlinedIcon
                  style={{
                    alignSelf: "center",
                    fontSize: "1.3rem",
                    color: "blue",
                    cursor: "pointer"
                  }}
                />
              </p>
              <input
                type="text"
                name="input"
                value={input ? input[section.id - 1] : ""}
                onChange={(e) => {
                  let newInput = [...input];
                  newInput[section.id - 1] = e.target.value;
                  setInput(newInput);
                }}
                readOnly={readOnly ? readOnly[section.id - 1] : true}
              />
            </div>

            <div className="edittoggle">
              <p
                onClick={() => handleSectionEdit(section.id.toString())}
                style={{ cursor: "pointer" }}
              >
                {save && save[section.id - 1] ? (
                  <button>Save</button>
                ) : (
                  <ModeEditOutlineIcon
                    style={{
                      alignSelf: "center",
                      fontSize: "1.1rem",
                      color: "#2D2D2D"
                    }}
                  />
                )}
              </p>
              <Switch
                style={{ alignSelf: "center", marginRight: "15px" }}
                color="secondary"
                defaultChecked
              />
            </div>
          </div>
        ))}
      </div>
      <button className="save" disabled={!hasChanges} onClick={handleSave}>
        Save and Next
      </button>
    </div>
  );
};

export default App;