import React, { useState, useEffect } from "react";
import { ApiService, apiRes } from "./services/proxy.service";
import "./App.css";
import {
  Container,
  Sidebar,
  Navbar,
  Input,
  InputGroup,
  Button,
  Panel,
  List,
  FlexboxGrid,
  PanelGroup,
  Content,
  Header,
  Footer,
} from "rsuite";
import { Search } from "@rsuite/icons";
import "rsuite/dist/rsuite.min.css";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [finalSearchTerm, setFinalSearchTerm] = useState<string>("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<apiRes[]>([]);

  useEffect(() => {
    async function getRelatedTopics(searchWord: string) {
      if (searchWord.length === 0 || typeof searchWord !== "string") {
        console.log(searchWord);
        return;
      }
      try {
        const results = await ApiService.get(`search?q=${searchWord}`);
        setSearchResults(results);
      } catch (error) {
        console.log(error);
        setSearchResults([]);
      }
    }
    getRelatedTopics(finalSearchTerm);
  }, [finalSearchTerm]);

  useEffect(() => {
    async function getHistory() {
      try {
        const results = await ApiService.get(`search/history`);
        setSearchHistory(results);
      } catch (error) {
        console.log(error);
        setSearchHistory([]);
      }
    }
    getHistory();
  }, []);

  const handleClearHistory = async () => {
    try {
      await ApiService.get(`search/history/remove`);
      setSearchHistory([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    setFinalSearchTerm(searchTerm);
    setSearchHistory([...searchHistory, searchTerm]);
  };

  const handleHistoryClick = (term: string) => {
    setSearchTerm(term);
    setFinalSearchTerm(term);
  };

  const getLink = (textArr: string[]) => {
    const returnArr: any[] = [];
    for (const text of textArr) {
      let arr = text.split("</a>");
      const link = arr[0].toString() + "</a>";
      const finalText = arr[1].toString();
      returnArr.push(
        <div className="panel-info-container">
          <div
            className="link-container"
            dangerouslySetInnerHTML={{ __html: link }}
          />
          <p className="result-text">{finalText}</p>
        </div>
      );
    }

    return returnArr;
  };

  return (
    <div className="App">
      <Header className="header-container">
        <h3>Enter a topic</h3>
      </Header>
      <Content className="content-container">
        <Container className="upper-container">
          <div className="side-bar-section">
            <Sidebar className="side-bar-container">
              <Navbar appearance="subtle">
                <Navbar></Navbar>
              </Navbar>
              <Panel header="Search History" className="history-panel">
                {searchHistory.length > 0 && (
                  <List className="history-list" bordered hover={true}>
                    {searchHistory.map((term, index) => (
                      <List.Item
                        size="md"
                        className="list-item"
                        onClick={() => {
                          handleHistoryClick(term);
                        }}
                        key={index}
                      >
                        {term}
                      </List.Item>
                    ))}
                  </List>
                )}
                <Button
                  appearance="ghost"
                  className="history-button"
                  onClick={handleClearHistory}
                >
                  Clear History
                </Button>
              </Panel>
            </Sidebar>
          </div>
          <div className="search-bar-section">
            <Container className="search-container">
              <FlexboxGrid justify="center">
                <FlexboxGrid.Item colspan={12}>
                  <InputGroup className="search-bar-container">
                    <Input
                      className="text-input"
                      value={searchTerm}
                      onChange={(value) => setSearchTerm(value)}
                      placeholder="Enter a search term"
                    />
                    <InputGroup.Button
                      onClick={() => {
                        handleSearch();
                      }}
                    >
                      <Search />
                    </InputGroup.Button>
                  </InputGroup>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </Container>
          </div>
          <div className="results-section">
            <Container className="results">
              {searchResults.length > 0 && (
                <PanelGroup className="panel-group">
                  {searchResults.map((result) => {
                    return (
                      <Panel header={result.Name} className="panel">
                        {getLink(result.Results)}
                      </Panel>
                    );
                  })}
                </PanelGroup>
              )}
            </Container>
          </div>
        </Container>
      </Content>
      <Footer></Footer>
    </div>
  );
}

export default App;
