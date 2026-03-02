import { writeFileSync } from 'fs';
import { createPptx } from '../src/writer';

async function main() {
  const slides = [
    // Slide 1: Heavy CSS title slide
    {
      html: `
        <h1 style="text-align: center; color: #FFFFFF; font-size: 48px; font-family: Georgia;">Annual Strategy Summit</h1>
        <h3 style="text-align: center; color: #BDC3C7; font-family: Georgia;">Global Operations & Growth Initiatives</h3>
        <p style="text-align: center;">
          <span style="color: #F39C12; font-weight: bold; font-size: 20px;">March 2026</span>
          <span style="color: #95A5A6;"> | </span>
          <span style="color: #ECF0F1; font-style: italic;">Board of Directors Session</span>
        </p>
        <p style="text-align: center;">
          <span style="background-color: #E74C3C; color: #FFFFFF; font-weight: bold; font-size: 14px;"> CONFIDENTIAL </span>
        </p>
      `,
      background: { type: 'solidFill' as const, color: '0D1B2A' },
    },

    // Slide 2: Heavily styled inline text, nested formatting, mixed decorations
    {
      html: `
        <h2 style="color: #2C3E50; font-family: Trebuchet MS;">Executive Summary</h2>
        <p>
          Our <strong style="color: #E74C3C;">Q4 revenue</strong> reached
          <span style="font-size: 28px; font-weight: bold; color: #27AE60;">$127.4M</span>,
          a <u><strong>record quarter</strong></u> surpassing the previous high by
          <span style="color: #2980B9; font-weight: bold;">18.3%</span>.
        </p>
        <p>
          <em style="color: #8E44AD;">Customer acquisition cost</em> decreased
          <s style="color: #95A5A6;">from $342</s> to
          <strong style="color: #27AE60; font-size: 22px;">$219</strong>
          (<span style="color: #27AE60;">-36%</span>), while
          <span style="font-weight: bold; text-decoration: underline; color: #2C3E50;">LTV:CAC ratio</span>
          improved to <strong>5.8x</strong>.
        </p>
        <p>
          Key risk: <span style="background-color: #FDEDEC; color: #E74C3C; font-weight: bold;">Supply chain disruptions</span>
          in APAC may impact Q2 margins by
          <span style="color: #E74C3C; text-decoration: line-through;">2-3pp</span>
          <span style="color: #E67E22; font-weight: bold;"> revised: 1.5-2pp</span>.
        </p>
        <blockquote>
          <em style="color: #7F8C8D; font-size: 16px;">"The numbers tell a compelling story of operational excellence and strategic discipline." — CFO Report</em>
        </blockquote>
      `,
    },

    // Slide 3: Complex table with styled cells, colspan-ish header simulation
    {
      html: `
        <h2 style="color: #1A5276;">Regional Performance Matrix</h2>
        <table>
          <thead>
            <tr>
              <th style="background-color: #1A5276; color: #FFFFFF;">Region</th>
              <th style="background-color: #1A5276; color: #FFFFFF;">Revenue</th>
              <th style="background-color: #1A5276; color: #FFFFFF;">Growth</th>
              <th style="background-color: #1A5276; color: #FFFFFF;">Margin</th>
              <th style="background-color: #1A5276; color: #FFFFFF;">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>North America</strong></td>
              <td style="text-align: right;">$58.2M</td>
              <td style="text-align: right; color: #27AE60; font-weight: bold;">+22.1%</td>
              <td style="text-align: right;">71.3%</td>
              <td style="color: #27AE60; font-weight: bold;">Exceeding</td>
            </tr>
            <tr>
              <td><strong>EMEA</strong></td>
              <td style="text-align: right;">$34.7M</td>
              <td style="text-align: right; color: #27AE60; font-weight: bold;">+15.8%</td>
              <td style="text-align: right;">68.9%</td>
              <td style="color: #27AE60; font-weight: bold;">On Track</td>
            </tr>
            <tr>
              <td><strong>APAC</strong></td>
              <td style="text-align: right;">$24.1M</td>
              <td style="text-align: right; color: #F39C12; font-weight: bold;">+8.4%</td>
              <td style="text-align: right;">62.1%</td>
              <td style="color: #F39C12; font-weight: bold;">At Risk</td>
            </tr>
            <tr>
              <td><strong>LATAM</strong></td>
              <td style="text-align: right;">$10.4M</td>
              <td style="text-align: right; color: #27AE60; font-weight: bold;">+41.2%</td>
              <td style="text-align: right;">59.4%</td>
              <td style="color: #2980B9; font-weight: bold;">Emerging</td>
            </tr>
          </tbody>
        </table>
        <p style="text-align: right;">
          <span style="font-size: 12px; color: #95A5A6;"><em>* All figures in USD. Growth is YoY. Margins are gross.</em></span>
        </p>
      `,
    },

    // Slide 4: Deeply nested lists, mixed OL/UL, inline code, links
    {
      html: `
        <h2 style="color: #6C3483;">Technology & Architecture</h2>
        <ol>
          <li>
            <strong style="color: #2C3E50;">Infrastructure Modernization</strong>
            <ul>
              <li>Migrate from <code>EC2</code> to <code>EKS</code> (Kubernetes) — <span style="color: #27AE60;">73% complete</span></li>
              <li>Implement <span style="font-weight: bold; color: #8E44AD;">service mesh</span> via <code>Istio</code></li>
              <li>Database: <s>PostgreSQL 14</s> → <strong style="color: #2980B9;">PostgreSQL 16</strong> + <code>pgvector</code></li>
            </ul>
          </li>
          <li>
            <strong style="color: #2C3E50;">AI/ML Pipeline</strong>
            <ul>
              <li>Real-time inference latency: <span style="color: #E74C3C; text-decoration: line-through;">120ms</span> → <strong style="color: #27AE60;">34ms p95</strong></li>
              <li>Model registry with <code>MLflow</code> + <code>Weights & Biases</code></li>
              <li>Fine-tuned <em>Claude Sonnet</em> for <u>document extraction</u></li>
            </ul>
          </li>
          <li>
            <strong style="color: #2C3E50;">Security & Compliance</strong>
            <ul>
              <li><span style="background-color: #D5F5E3; color: #1E8449; font-weight: bold;">SOC 2 Type II</span> — certified Jan 2026</li>
              <li><span style="background-color: #D5F5E3; color: #1E8449; font-weight: bold;">HIPAA</span> — in progress, ETA Q3</li>
              <li><span style="background-color: #FADBD8; color: #C0392B; font-weight: bold;">FedRAMP</span> — scoping phase</li>
            </ul>
          </li>
        </ol>
        <p>Architecture docs: <a href="https://docs.example.com/architecture">docs.example.com/architecture</a></p>
      `,
    },

    // Slide 5: Code blocks, superscript/subscript, complex inline spans
    {
      html: `
        <h2 style="color: #1B4F72;">Data & Analytics Platform</h2>
        <p>
          Processing <strong style="font-size: 24px; color: #2E86C1;">2.4 PB</strong>/day
          across <span style="font-weight: bold;">18 data centers</span>.
          Query p99 latency: <span style="color: #27AE60; font-weight: bold;">47ms</span>.
        </p>
        <pre><code>-- Top revenue contributors (last 30 days)
SELECT
    customer_segment,
    SUM(revenue) AS total_revenue,
    COUNT(DISTINCT customer_id) AS unique_customers,
    AVG(deal_size) AS avg_deal
FROM analytics.revenue_fact
WHERE event_date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY customer_segment
ORDER BY total_revenue DESC
LIMIT 10;</code></pre>
        <p>
          Formula: Revenue Growth = (R<sub>t</sub> - R<sub>t-1</sub>) / R<sub>t-1</sub> × 10<sup>2</sup>%
        </p>
        <p>
          <span style="font-size: 12px; color: #7F8C8D;">
            Data pipeline built with
            <strong>Apache Spark</strong>,
            <strong>dbt</strong>,
            <strong>Snowflake</strong>, and
            <strong>Dagster</strong>.
            See <a href="https://data.example.com/lineage">lineage dashboard</a>.
          </span>
        </p>
      `,
    },

    // Slide 6: Multiple tables, mixed content
    {
      html: `
        <h2 style="color: #7D3C98;">OKR Scorecard — Q4 2025</h2>
        <table>
          <tr>
            <th style="background-color: #7D3C98; color: #FFFFFF;">Objective</th>
            <th style="background-color: #7D3C98; color: #FFFFFF;">Key Result</th>
            <th style="background-color: #7D3C98; color: #FFFFFF;">Target</th>
            <th style="background-color: #7D3C98; color: #FFFFFF;">Actual</th>
            <th style="background-color: #7D3C98; color: #FFFFFF;">Grade</th>
          </tr>
          <tr>
            <td><strong>Grow Revenue</strong></td>
            <td>ARR growth rate</td>
            <td style="text-align: center;">25%</td>
            <td style="text-align: center; font-weight: bold; color: #27AE60;">28.3%</td>
            <td style="text-align: center; background-color: #D5F5E3; color: #1E8449; font-weight: bold;">1.0</td>
          </tr>
          <tr>
            <td><strong>Expand Market</strong></td>
            <td>New geo launches</td>
            <td style="text-align: center;">3</td>
            <td style="text-align: center; font-weight: bold; color: #27AE60;">4</td>
            <td style="text-align: center; background-color: #D5F5E3; color: #1E8449; font-weight: bold;">1.0</td>
          </tr>
          <tr>
            <td><strong>Product NPS</strong></td>
            <td>Customer NPS score</td>
            <td style="text-align: center;">65</td>
            <td style="text-align: center; font-weight: bold; color: #F39C12;">58</td>
            <td style="text-align: center; background-color: #FEF9E7; color: #D4AC0D; font-weight: bold;">0.7</td>
          </tr>
          <tr>
            <td><strong>Platform Uptime</strong></td>
            <td>Availability SLA</td>
            <td style="text-align: center;">99.95%</td>
            <td style="text-align: center; font-weight: bold; color: #27AE60;">99.98%</td>
            <td style="text-align: center; background-color: #D5F5E3; color: #1E8449; font-weight: bold;">1.0</td>
          </tr>
          <tr>
            <td><strong>Hiring</strong></td>
            <td>Engineering headcount</td>
            <td style="text-align: center;">80</td>
            <td style="text-align: center; font-weight: bold; color: #E74C3C;">72</td>
            <td style="text-align: center; background-color: #FADBD8; color: #C0392B; font-weight: bold;">0.4</td>
          </tr>
        </table>
        <p style="text-align: center;">
          <strong>Overall Score: </strong>
          <span style="font-size: 24px; font-weight: bold; color: #27AE60;">0.82</span>
          <span style="color: #95A5A6;"> / 1.0</span>
        </p>
      `,
    },

    // Slide 7: Gradient background, dense mixed content
    {
      html: `
        <h2 style="color: #D35400;">Competitive Landscape</h2>
        <p>
          <span style="font-weight: bold; font-size: 20px; color: #2C3E50;">Market Position:</span>
          <span style="background-color: #2ECC71; color: #FFFFFF; font-weight: bold;"> #2 </span>
          in enterprise segment,
          <span style="background-color: #3498DB; color: #FFFFFF; font-weight: bold;"> #1 </span>
          in mid-market.
        </p>
        <table>
          <tr>
            <th>Competitor</th>
            <th>Market Share</th>
            <th>Trend</th>
            <th>Threat Level</th>
          </tr>
          <tr>
            <td><strong>Acme Corp</strong></td>
            <td>31.2%</td>
            <td style="color: #E74C3C;">Declining (-2.1pp)</td>
            <td><span style="background-color: #FEF9E7; color: #D4AC0D; font-weight: bold;">Medium</span></td>
          </tr>
          <tr>
            <td><strong>Us</strong></td>
            <td style="font-weight: bold; color: #2980B9;">24.8%</td>
            <td style="color: #27AE60; font-weight: bold;">Growing (+4.3pp)</td>
            <td>—</td>
          </tr>
          <tr>
            <td><strong>NovaTech</strong></td>
            <td>18.1%</td>
            <td style="color: #27AE60;">Growing (+1.8pp)</td>
            <td><span style="background-color: #FADBD8; color: #C0392B; font-weight: bold;">High</span></td>
          </tr>
          <tr>
            <td><strong>Others</strong></td>
            <td>25.9%</td>
            <td style="color: #95A5A6;">Flat</td>
            <td><span style="background-color: #D5F5E3; color: #1E8449; font-weight: bold;">Low</span></td>
          </tr>
        </table>
        <p>
          <span style="font-size: 14px; color: #7F8C8D;">
            <em>Source: <a href="https://gartner.com">Gartner Magic Quadrant 2025</a>,
            <a href="https://forrester.com">Forrester Wave Q4 2025</a></em>
          </span>
        </p>
      `,
    },

    // Slide 8: Closing slide with heavy styling
    {
      html: `
        <h1 style="text-align: center; color: #ECF0F1; font-family: Georgia; font-size: 44px;">Thank You</h1>
        <p style="text-align: center;">
          <span style="color: #F39C12; font-size: 22px; font-weight: bold;">Questions?</span>
        </p>
        <p style="text-align: center; color: #BDC3C7;">
          <em>Contact the strategy team:</em><br>
          <a href="mailto:strategy@example.com">strategy@example.com</a><br>
          <span style="font-size: 14px;">Slack: <code>#strategy-2026</code></span>
        </p>
        <p style="text-align: center; font-size: 11px; color: #7F8C8D;">
          This document contains <span style="text-decoration: underline;">proprietary and confidential</span> information.<br>
          Distribution outside the Board of Directors is
          <strong style="color: #E74C3C;">strictly prohibited</strong>.
        </p>
      `,
      background: { type: 'solidFill' as const, color: '1C2833' },
    },
  ];

  const buffer = await createPptx(slides, {
    slideWidth: 960,
    slideHeight: 540,
    defaultFontFamily: 'Calibri',
    defaultFontSize: 18,
  });

  const outputPath = '/Users/stephaniegoldman/pptx-preview/sample-output.pptx';
  writeFileSync(outputPath, Buffer.from(buffer));
  console.log(`Generated: ${outputPath} (${buffer.byteLength} bytes)`);
}

main().catch(console.error);
