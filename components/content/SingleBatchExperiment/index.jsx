import Layout from "../../Layout";
import ArticleHeader from "../../ArticleHeader";
import Header from "../../Header";

export const article = {
  route: "/posts/single-batch-experiment",
  title: "An Experiment in Single-Batch Working",
  isoDate: "2015-08-08",
  preview:
    "We wanted to see what would happen if our whole team worked on just a single story, nothing else, for a whole day, maybe a whole sprint.",
};

function Post() {
  return (
    <>
      <Header />
      <Layout>
        <article>
          <ArticleHeader article={article} />

          <p>
            In this post I talk about how using a single-batch approach for a
            medium sized feature can increase productivity of a dev. team.
          </p>

          <p>
            I work in a small engineering team within a much bigger engineering
            department, we are four developers, tester, and a UX designer. We
            work in 2 week sprints and we like to keep busy. Sprint planning is
            always ambitious (we can always do a few story points more this time
            right?). We push to get our burndown chart down to zero, context
            switching and multitasking to squeeze out that extra efficiency.
          </p>

          <p>
            But as each of us tried to keep busy and operate at maximum
            efficiency, I started to notice problems. Multitasking and context
            switching, interruptions and work perpetually in progress, leading
            to a stubbornly horizontal burndown, and increased
            <a href="https://confluence.atlassian.com/display/AGILE/Cycle+Time">
              cycle time
            </a>
            . We started to look like factory workers, doing our piece of work
            on a feature and passing it on, immediately starting the next thing.
          </p>

          <p>
            This old post{" "}
            <a href="http://programmers.stackexchange.com/a/45814">
              http://programmers.stackexchange.com/a/45814
            </a>{" "}
            came to mind. It talks about two types of development teams, widget
            factories and film crews. I love this analogy, I want to work in a
            film crew; a talented team that works together to solve challenging
            problems.
          </p>

          <h2>Single Piece Flow</h2>
          <p>
            In his book “The Lean Startup”, Eric Ries talks about “Single Piece
            Flow”, he uses a simple analogy: putting newsletters into envelopes.
            Ries explains that our intuition might lead us to think that
            repeating small tasks over and over is quicker. Folding the letters,
            then stuffing each envelop, finally sealing each envelope and
            addressing each envelope. We assume that avoiding variation and
            repeating the same repetitive task increases our speed.{" "}
          </p>

          <p>
            But we don’t account for the effort to manage all the work in
            progress. And we can’t handle the unexpected, like finding the
            folded paper didn’t fit the envelopes (we would have folded all the
            paper already).
          </p>

          <blockquote cite="http://theleanstartup.com/book">
            <p>
              “In process-oriented work, individual performance is not nearly as
              important as the overall performance of the system”
              <br />
              <span>Eric Ries, The Lean Startup</span>
            </p>
          </blockquote>

          <p>
            With a single batch approach problems are found and corrected much
            more quickly, there is less work-in-progress to manage, and a
            finished product is produced at much shorter intervals.
          </p>

          <h2>Our Day of Experimenting</h2>
          <p>
            We wanted to see what would happen if our whole team worked on just
            a single story, nothing else, for a whole day, maybe a whole sprint.
          </p>

          <p>
            We picked a medium size story, a requirement to “lock” query strings
            from being edited. We kicked off using a version of{" "}
            <a href="http://dschool.stanford.edu/dgift/">
              Stanford University’s Design Thinking
            </a>
            . In the "empathise" and "define" phases we questioned our product
            manager, using a whiteboard we dug down (asking “why”) until we
            found the goal of the story: protecting revenue (well-written
            queries represent an investment in time and money, and the data they
            generate is used to make real business decisions).
          </p>

          <blockquote>
            <p>
              “As an administrator I want to protect my valuable data sources so
              that my teams can make reliable business decisions”
            </p>
          </blockquote>

          <p>
            Next, in the "ideate" phase we all spent 30 minutes sketching as
            many ideas onto paper as we could. We discussed and explained our
            sketches to each other and talked about the minimal behaviour we
            could build to satisfy the story.
          </p>

          <p>
            <figure>
              <img src="/single-batch-day/sketches.jpg" />
              <br />
              <figcaption>A selection of our sketches</figcaption>
            </figure>
          </p>

          <p>
            Then we split into 2 groups, the first drafting some database schema
            changes on the whiteboard, the other tracking down a couple of our
            account managers to talk through our ideas.
          </p>

          <p>
            Before long some API changes had been agreed, the UI and backend
            builds were starting, AT tests were being written. Meanwhile Stefan
            our UX Designer put together a clickable prototype and conducted
            some quick usability tests by walking around the office.
          </p>

          <h2>Results</h2>
          <p>
            This was probably the smoothest task we have completed as a team. We
            had asked all the right questions, identified the core goals
            up-front. We built a solid <strong>shared understanding</strong> of
            what it was we were building, and most importantly,{" "}
            <strong>why</strong> we were building it. Communication was so much
            easier when everybody understood what everyone else was doing.
          </p>

          <p>
            At the end of this sprint we{" "}
            <strong>delivered the finished feature</strong>.
          </p>

          <p>
            Feedback from everyone on the team was really positive. I think the
            change of scenery helped (do something different sometimes!) but we
            could all see this technique was working as well as we had hoped.
          </p>

          <p>
            In truth we didn’t stick to only one story after this day, other
            small things did come along that required individuals to switch
            focus for a while. And there was at least one thing we missed (and a
            stakeholder spotted early on), but as a team we came up with a
            solution without much trouble.
          </p>

          <p>
            Despite contributing maybe 25% of the code for this feature, I have
            so much knowledge about how it works and where the complexities lie
            (and there were some tricky problems) that I could easily jump in
            and look at any problems or iterations on it.
          </p>

          <p>
            Working on a single feature or theme lowers the overhead of
            work-in-progress and brings out the power of the team working
            collectively. Going back to the film crew analogy... that’s exactly
            how I imagine a film crew should work.
          </p>
        </article>
      </Layout>
    </>
  );
}

export default Post;
