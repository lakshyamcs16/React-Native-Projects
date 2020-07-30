### Next pending items:
    1. Add error handling and validations for inputs ++
    2. Add routing library ++
    3. Add persistence ++
    4. Handle automatic login button click on enter with keyboard ++

    ----
    6. Log analytics **
    7. Network issues

> powerbi.apiuser@aequim.com
> U#hs$w31s

no sign up page 

presentation: clicks
debug: more logs 
normal: 





DEMO.JS

----


<ScrollView>
            <View style={styles.container}>
              <View style={styles.keyStats}>
                <Text style={styles.keyHeading}>568.80</Text>
                <Text style={styles.keySubHeading}>Closed, 15:59 03/13 IST</Text>
              </View>
              <View style={styles.statsContainer}>
                <View style={styles.statDetails}>
                  <TouchableOpacity onPress={() => Actions["open"].call()}>
                    <Text style={styles.statHeading}>OPEN</Text>
                    <Text style={styles.statSubHeading}>516.95</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.statHeading}>PREV CLOSE</Text>
                    <Text style={styles.statSubHeading}>543.25</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.statDetails}>
                  <Text style={styles.statHeading}>DAY'S RANGE</Text>
                  <Text style={styles.statSubHeading}>451.10-585.65</Text>

                  <Text style={styles.statHeading}>MARKET CAP</Text>
                  <Text style={styles.statSubHeading}>1.60T</Text>
                </View>
                <View style={styles.statDetails}>
                  <Text style={styles.statHeadingLast}>VOLUME</Text>
                  <Text style={styles.statSubHeadingLast}>25.60M</Text>


                  <Text style={styles.statHeadingLast}>AVG VOL (3M)</Text>
                  <Text style={styles.statSubHeadingLast}>9.27M</Text>
                </View>
              </View>
              <View style={styles.chartConfig}>
                <WebView
                  source={isAndroid ? { uri: uri } : HTML_FILE}
                  injectedJavaScript={'Drawchart()'}
                  style={{ flex: null, height: 395 }}
                  originWhitelist={['*']}
                  domStorageEnabled={true}
                  javaScriptEnabled={true}
                  mixedContentMode={'compatibility'}
                />
              </View>
              <View>
                <TableView data={this.state.data} />
              </View>
            </View>
          </ScrollView>
