import React, { useState, useEffect } from "react";
import { ApiService, apiRes } from "./services/proxy.service";
import "./App.css";
import {
  Container,
  Sidebar,
  Navbar,
  Nav,
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

  return (
    <div className="App">
      <Header className="header-container">
        <h3>Enter a topic</h3>
      </Header>
      <Content className="content-container">
        <Container className="upper-container">
          <Sidebar>
            <Navbar appearance="subtle">
              <Navbar>
                <Nav>
                  <Nav.Item>Search History</Nav.Item>
                </Nav>
              </Navbar>
            </Navbar>
            <Panel header="Search History">
              <List>
                {searchHistory.map((term, index) => (
                  <List.Item key={index}>{term}</List.Item>
                ))}
              </List>
              <Button appearance="subtle" onClick={handleClearHistory}>
                Clear History
              </Button>
            </Panel>
          </Sidebar>
          <Container>
            <FlexboxGrid justify="center">
              <FlexboxGrid.Item colspan={12}>
                <InputGroup>
                  <Input
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
          <Container id="results">
            {searchResults.length > 0 && (
              <PanelGroup>
                {searchResults.map((result) => {
                  return (
                    <Panel header={result.Name}>
                      <p>{result.Results}</p>
                    </Panel>
                  );
                })}
              </PanelGroup>
            )}
          </Container>
        </Container>
      </Content>
      <Footer></Footer>
    </div>
  );
}

export default App;
