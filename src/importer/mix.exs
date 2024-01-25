defmodule Importer.MixProject do
  use Mix.Project

  def project do
    [
      app: :importer,
      version: "0.1.0",
      elixir: "~> 1.12",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  def application do
    [
      extra_applications: [:logger],
      mod: {SD.Importer.Application, []}
    ]
  end

  defp deps do
    [
      {:sweet_xml, "~> 0.7.4"},
      {:ecto, "~> 3.7"},
      {:postgrex, "~> 0.15"}
    ]
  end
end
