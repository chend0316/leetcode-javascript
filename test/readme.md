力扣的测试用例数据可以通过以下步骤得到：
1. 提交一个空代码
2. 在提交结果中可以看到第一个失败的用例输入，以及预期的用例输出
3. 修改你的代码使其能通过第 2 步中的失败用例，并提交代码，这时你会看到下一个失败的测试用例
4. 不断重复步骤 2 和步骤 3，直到代码通过所有测试用例

想做个爬虫自动抓题目数据，但是我好懒啊。

力扣题目信息可以通过 GraphQL 爬虫，Schema 如下：
```
{"operationName":"questionData","variables":{"titleSlug":"two-sum"},"query":"query questionData($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    questionId
    questionFrontendId
    boundTopicId
    title
    titleSlug
    content
    translatedTitle
    translatedContent
    isPaidOnly
    difficulty
    likes
    dislikes
    isLiked
    similarQuestions
    contributors {
      username
      profileUrl
      avatarUrl
      __typename
    }
    langToValidPlayground
    topicTags {
      name
      slug
      translatedName
      __typename
    }
    companyTagStats
    codeSnippets {
      lang
      langSlug
      code
      __typename
    }
    stats
    hints
    solution {
      id
      canSeeDetail
      __typename
    }
    status
    sampleTestCase
    metaData
    judgerAvailable
    judgeType
    mysqlSchemas
    enableRunCode
    envInfo
    book {
      id
      bookName
      pressName
      source
      shortDescription
      fullDescription
      bookImgUrl
      pressImgUrl
      productUrl
      __typename
    }
    isSubscribed
    isDailyQuestion
    dailyRecordStatus
    editorType
    ugcQuestionId
    style
    exampleTestcases
    __typename
  }
}
"}
```
