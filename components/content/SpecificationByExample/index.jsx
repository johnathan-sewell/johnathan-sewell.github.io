import Layout from "../../Layout";
import PostHeader from "../../PostHeader";
import Header from "../../Header";

export const post = {
  route: "/posts/specification-by-example",
  title: "Specification By Example",
  isoDate: "2022-04-01",
  preview:
    "Communication is the most important aspect of complex software projects. Unfortunately natural language is ambiguous. Specification-by-example is a tool to capture complex business requirements in a way that makes sense for all members of a software team.",
};

function Post() {
  return (
    <>
      <Header />
      <Layout>
        <article>
          <PostHeader post={post} />
          <p>
            Communication is the most important aspect of complex software
            projects. Unfortunately{" "}
            <strong>natural language is ambiguous</strong>, and we automatically
            try to summarise complex behaviour into more abstract descriptions
            when we communicate. When describing the behaviour of complex
            systems natural language can lead to communication gaps, leading to
            bugs and expensive rework.
          </p>
          <p>
            Compared to natural communication,{" "}
            <strong>realistic examples</strong> are much less likely to lead to
            communication gaps. When we use realistic examples to discuss
            specific business rules, it becomes easier to spot gaps that could
            otherwise have been missed.
          </p>
          <p>
            We should write examples collaboratively as a team, this is how we
            discover gaps before we start building software, and build an
            accurate shared understanding of a complex system.
          </p>
          <h2>Given-When-Then</h2>
          <p>
            We can create examples using “given-when-then” statements. For
            example:
            <blockquote>
              <strong>Given</strong> I added 5 books to my shopping basket
              <br />
              <strong>When</strong> I check out the shopping basket
              <br />
              <strong>Then</strong> I will not be charged for delivery
            </blockquote>
          </p>
          <h3>Guidelines for writing given-when-then statements</h3>
          <div>
            <ul>
              <li>
                <strong>Use real values in examples.</strong>
                <br />
                This is key to unearthing gaps in the specification. Don’t use
                phrases like “the total should reflect the total number” or “the
                salary value must be correct”, instead say “the total will be
                10” or “the salary value will be 2.100,45kr”
              </li>
              <li>
                <strong>Keep examples as simple as possible.</strong>
                <br />
                Each example should focus on a single business rule. It’s very
                easy to create long scenarios that are hard to read and
                understand. Try to have a single ‘Given’ and ‘When’ statement
                per scenario.
              </li>
              <li>
                <strong>Avoid referring to user interfaces.</strong>
                <br />
                We’re concerned with making business rules clear to the whole
                team, not writing test scripts (examples can be used as the
                basis for test scripts and automated tests later). Business
                rules affect the frontend and backend, web, mobile, and APIs.
                Don’t make examples specific to one interface. Avoid terms like
                “When the save button is clicked”, instead say “when the salary
                value is saved”
              </li>
              <li>
                <strong>Make acceptance criteria self explanatory. </strong>
                <br />
                Do your examples make sense to the people who didn’t help to
                write them? Will they make sense to you after a year?
              </li>
              <li>
                <strong>Stick to agreed domain language.</strong>
                <br />
                Is it “security permission” or “security group” or “security
                action”? Agree and stick to it.
              </li>
            </ul>
          </div>
          <p>
            If you find you need to create a lot of examples,{" "}
            <strong>try using a table</strong> to reduce repetition, for
            example:
            <br />
            <br />
            <strong>Given</strong> the threshold for free delivery is 5 books,
            we expect the following:
          </p>
          <table>
            <thead>
              <tr>
                <th>When the number of books in the shopping basket is:</th>
                <th>The the delivery charge is:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>50kr</td>
              </tr>
              <tr>
                <td>2</td>
                <td>50kr</td>
              </tr>
              <tr>
                <td>3</td>
                <td>50kr</td>
              </tr>
              <tr>
                <td>4</td>
                <td>50kr</td>
              </tr>
              <tr>
                <td>5</td>
                <td>0kr</td>
              </tr>
              <tr>
                <td>6</td>
                <td>0kr</td>
              </tr>
            </tbody>
          </table>
          <p>
            The guidelines above help us to communicate business rules clearly,
            I’ve reworked a poorly written rule below to follow these guidelines
            as an illustration. This is a rule for showing a total count on a
            list of employees.
            <br />
            <blockquote>
              <strong>Given</strong> I am on the employee list page
              <br />
              <strong>When</strong> I click to select a department on the all
              departments dropdown
              <br />
              <strong>Then</strong> the number on total employees reflects the
              total number of employees in the department
            </blockquote>
          </p>
          <p>
            This can be rewritten to remove mentions of the UI, and use
            realistic values:
            <blockquote>
              <strong>
                Rule: Employee count matches total number of employees in a
                department
              </strong>
              <br />
              <strong>Given</strong> there are 100 employees in the department
              “South West”
              <br />
              <strong>When</strong> I get the list of all employees in the
              department “South West”
              <br />
              <strong>Then</strong> the "total employees" value is 100
            </blockquote>
          </p>

          <h2>Specification by example is for the whole team</h2>
          <p>
            Using specification by example, <strong>product managers</strong>{" "}
            can have more confidence that the developers understand complex
            business rules, examples can be used as acceptance criteria, and
            when we need to revisit a feature in the future, examples help us
            identify the what needs to be changed and what the effect will be.
            For <strong>developers</strong>, examples help flush out
            requirements before development starts.{" "}
            <strong>QA engineers</strong> will get a much better understanding
            of the domain and can use realistic examples as the basis for manual
            testing and automation too.
          </p>
          <h2>Example Mapping</h2>
          <p>
            This is a workshop technique that can be tried during refinement
            sessions to capture examples in a structured and collaborative way:{" "}
            <a href="https://cucumber.io/blog/example-mapping-introduction/">
              https://cucumber.io/blog/example-mapping-introduction/
            </a>
          </p>
          <h2>More information</h2>
          <p>
            I can recommend both these books by Gojko Adzec on the subject of
            specification in agile teams:
            <br />
            <a href="https://gojko.net/books/bridging-the-communication-gap/">
              https://gojko.net/books/bridging-the-communication-gap/
            </a>
            <br />
            <a href="https://gojko.net/books/specification-by-example/">
              https://gojko.net/books/specification-by-example/
            </a>
            <br />
            Gojko also has some useful articles on his website:
            <br />
            <a href="https://gojko.net/2010/06/16/anatomy-of-a-good-acceptance-test/">
              https://gojko.net/2010/06/16/anatomy-of-a-good-acceptance-test/
            </a>
          </p>
        </article>
      </Layout>
    </>
  );
}

export default Post;
